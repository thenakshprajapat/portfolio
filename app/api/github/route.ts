import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const username = "thenakshprajapat";

  try {
    const headers = {
      "User-Agent": "Naksh-Portfolio-Web/1.0",
      Accept: "application/json",
    };

    // Parallel fetch GitHub user, contributions, and repositories
    const [userRes, contribRes, reposRes] = await Promise.allSettled([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=6`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    let userData: any = null;
    if (userRes.status === "fulfilled" && userRes.value.ok) {
      userData = await userRes.value.json();
    }

    let contribData: any = null;
    if (contribRes.status === "fulfilled" && contribRes.value.ok) {
      contribData = await contribRes.value.json();
    }

    let reposData: any[] = [];
    if (reposRes.status === "fulfilled" && reposRes.value.ok) {
      reposData = await reposRes.value.json();
    }

    // Process contributions into weeks (each week has 7 days)
    const rawContributions: Array<{ date: string; count: number; level: number }> =
      contribData?.contributions || [];
    
    const weeks: Array<Array<{ date: string; count: number; level: number }>> = [];
    let currentWeek: Array<{ date: string; count: number; level: number }> = [];

    // Group the raw contributions by 7-day weeks
    for (let i = 0; i < rawContributions.length; i++) {
      currentWeek.push(rawContributions[i]);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    const totalContributions =
      contribData?.total?.lastYear ??
      rawContributions.reduce((acc, curr) => acc + curr.count, 0) ??
      57;

    const latestRepo = reposData.length > 0
      ? {
          name: reposData[0].name,
          url: reposData[0].html_url,
          description: reposData[0].description,
          language: reposData[0].language,
          stars: reposData[0].stargazers_count,
          forks: reposData[0].forks_count,
        }
      : {
          name: "contacts-firebase",
          url: "https://github.com/thenakshprajapat/contacts-firebase",
          description: "High-reliability distributed contact manager with Firestore",
          language: "TypeScript",
          stars: 1,
          forks: 0,
        };

    const payload = {
      username,
      name: userData?.name || "Naksh Prajapati",
      avatarUrl: userData?.avatar_url || `https://avatars.githubusercontent.com/u/193075937?v=4`,
      publicRepos: userData?.public_repos ?? 10,
      followers: userData?.followers ?? 2,
      following: userData?.following ?? 4,
      contributions: {
        total: totalContributions,
        days: rawContributions,
        weeks: weeks.length > 0 ? weeks : null,
      },
      latestRepo,
      repos: reposData.map((r: any) => ({
        id: r.id,
        name: r.name,
        fullName: r.full_name,
        url: r.html_url,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        updatedAt: r.updated_at,
      })),
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("GitHub API route error:", error);

    // Fallback response with verified real baseline stats
    return NextResponse.json(
      {
        username,
        name: "Naksh Prajapati",
        avatarUrl: "https://avatars.githubusercontent.com/u/193075937?v=4",
        publicRepos: 10,
        followers: 2,
        following: 4,
        contributions: {
          total: 57,
          days: [],
          weeks: null,
        },
        latestRepo: {
          name: "contacts-firebase",
          url: "https://github.com/thenakshprajapat/contacts-firebase",
          description: "Distributed contact manager with Firestore realtime listeners",
          language: "TypeScript",
          stars: 1,
          forks: 0,
        },
        repos: [],
        timestamp: new Date().toISOString(),
        fallback: true,
      },
      { status: 200 }
    );
  }
}
