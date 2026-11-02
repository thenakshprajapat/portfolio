export interface Essay {
  id: string;
  title: string;
  date: string;
  readTime: string;
  href: string;
  content: string;
}

export const ESSAYS: Essay[] = [
  {
    id: "things-i-learned-from-suits",
    title: "Things I Learned from Suits",
    date: "Aug 2026",
    readTime: "2 min",
    href: "/writing#things-i-learned-from-suits",
    content: `Most legal dramas are about courtroom procedures, but Suits is really a show about ambition, standards, and how you carry yourself when the pressure is on. Watching Harvey Specter, four lines stuck with me because they apply directly to building software and pushing past average work.

"Life is this. I like this."
Most people settle for a flat, predictable baseline because aiming higher takes effort. Raising your standard means deciding that mediocre work is not enough for you, and actually enjoying the work required to get above it.

"You want to lose small, I want to win big."
Playing not to fail guarantees you only ever build safe, forgettable things. When you are learning or shipping a project, taking a real swing at a hard problem teaches you ten times more than playing it safe.

"Excuses don't win championships."
Nobody cares why a feature is broken or why a deadline slipped. Owning the result instead of explaining away the failure is the fastest way to improve.

"Winners don't make excuses when the other side plays the game."
When things get tough or circumstances are unfair, complaining changes nothing. Adapt, outwork the problem, and find a way through.`,
  },
  {
    id: "psychology-of-laziness",
    title: "The Psychology of Laziness, and How to Get Your Mind Working",
    date: "Jul 2026",
    readTime: "2 min",
    href: "/writing#psychology-of-laziness",
    content: `What we usually call laziness is almost never a lack of energy. Psychologically, your brain is wired to conserve effort whenever a task feels vague, overwhelming, or too far away from a reward. When you sit in front of a blank editor and suddenly feel tired, your mind isn't broken. It is just avoiding friction and uncertainty.

The biggest trigger for procrastination is ambiguity. If your goal for the afternoon is "work on the app," your brain sees a mountain with no clear first step and immediately looks for an easy distraction.

To get your mind working, you have to lower the activation energy required to start:

1. Shrink the first step until it feels trivial. Don't sit down to build an entire dashboard; sit down to write one function or fix one button.

2. Rely on action to create motivation, not the other way around. Focus follows motion. Once you spend five uninterrupted minutes solving a concrete problem, momentum takes over.

3. Remove friction from your environment. Keep your workspace ready and your phone out of reach so starting the real work is easier than escaping it.`,
  },
];
