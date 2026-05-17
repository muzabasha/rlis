const fs = require('fs');
const path = require('path');

const funnyDetails = {
    "Topic1_EarlyRoots": "Thorndike's cats were probably just trying to find a warm keyboard to sit on, but accidentally invented RL instead.",
    "Topic2_NeedForRL": "Without RL, your robot vacuum would just repeatedly headbutt the wall like a confused Roomba until its battery dies.",
    "Topic3_RLvsSLvsUL": "Supervised Learning is a helicopter parent. Unsupervised is a neglectful parent. RL is giving a toddler a candy every time they do the dishes.",
    "Topic4_ElementsOfRL": "An agent, an environment, and a reward signal walk into a bar. The agent tries to maximise the drinks, the environment throws the agent out, and the reward is -100.",
    "Topic5_EnvironmentTypes": "Deterministic environments are like math tests. Stochastic environments are like trying to guess what your partner wants for dinner.",
    "Topic6_WorkingOfRL": "It's basically an endless loop of 'mess around and find out', mathematically formalized.",
    "Topic7_ApproachesToRL": "Value-based is like checking price tags. Policy-based is like acting on pure vibes.",
    "Topic8_TypesOfRL": "Model-free is like driving without a map and just turning where the road looks nice.",
    "Topic9_ExplorationExploitation": "Exploitation is going to your favorite restaurant for the 100th time. Exploration is trying that sketchy sushi place and getting food poisoning (-50 reward).",
    "Topic10_AdvantagesOfRL": "Advantage: it learns by itself! Disadvantage: it might learn to pause the game so it never loses.",
    "Topic11_ApplicationsOfRL": "It can beat you at chess, Go, and Starcraft, but still struggles to open a door properly.",
    "Topic12_ChallengesWithRL": "Reward hacking: like when you tell an AI to clean a room, and it just sets the house on fire so there's no room left to clean.",
    "Topic13_RLvsDLvsML": "Machine Learning is the family. Deep Learning is the trendy cousin. RL is the wild child doing parkour in the backyard.",

    "Topic1_MDPComponents": "Markov Decision Processes sound intimidating until you realize it's just 'Where am I, what can I do, and where's my treat?'",
    "Topic2_FormalMDPDefinition": "A 5-tuple of (S, A, P, R, Gamma) is just math-speak for the ultimate tabletop RPG rulebook.",
    "Topic3_MarkovPropertyChain": "The Markov Property means having the memory of a goldfish. The future only depends on right now!",
    "Topic4_MarkovChainAnalysis": "Analyzing a Markov Chain is like predicting the weather: mostly sunny, followed by a 30% chance of an existential crisis.",
    "Topic5_MarkovModel": "It's just state machines with gambling added.",
    "Topic6_MarkovMatrix": "A grid of numbers that tells you exactly how likely you are to transition from 'Productive' to 'Watching Cat Videos'.",
    "Topic7_MarkovMatricesInML": "Because regular matrices weren't confusing enough, we made them probabilistic.",
    "Topic8_RewardAndReturns": "Returns are just delayed gratification. It's like eating broccoli now so you get dessert later.",
    "Topic9_MarkovRewardProcess": "An MRP is an MDP but the agent is on autopilot and just along for the ride, collecting coins.",
    "Topic10_StateValueFunction": "How good is it to be in this state? Well, being at a buffet: high value. Being in a dentist's chair: low value.",
    "Topic11_ActionValueFunction": "Q-values: answering the eternal question of 'If I do this dumb thing right now, how much will I regret it later?'",
    "Topic12_OptimalPolicy": "The Optimal Policy is the ultimate cheat code for life, dictating the best possible action in every conceivable scenario.",
    "Topic13_MDPExamples": "From gridworlds to helicopter acrobatics, MDPs are everywhere. Just don't ask it to do your taxes.",

    "Topic1_PolicyInMDP": "A policy is just a giant flowchart of 'If X, do Y', except X is 'everything' and Y is 'hopefully not crash'.",
    "Topic2_QLearningIntro": "Q-Learning: where an agent stumbles around blindly until it accidentally does something smart, then writes it down.",
    "Topic3_DeterministicStochasticPolicy": "Deterministic: I will always order pizza. Stochastic: I have a 10% chance of ordering a salad and being sad about it.",
    "Topic4_BellmanEquationValue": "Richard Bellman invented this in the 1950s, probably while trying to optimally navigate his way to the coffee machine.",
    "Topic5_RecyclingRobotCase": "The recycling robot: forced to choose between picking up cans and dying of a dead battery. Truly a modern tragedy.",
    "Topic6_OptimalPolicyValue": "The math behind making the absolute best choices, which we humans almost never do.",
    "Topic7_BackupDiagram": "Backup diagrams look like weird trees, but they're just visualizing the agent's anxiety about all possible futures.",
    "Topic8_QLearningOverview": "The algorithm that proved you don't need to understand the world to conquer it, just a really big lookup table.",
    "Topic9_QLearningTerms": "Alpha, Gamma, Epsilon... sounds like a frat house, but it's actually the secret sauce to artificial intelligence.",
    "Topic10_WorkingOfQLearning": "Initialize with zeros, act randomly, update slowly, and eventually look like a genius.",
    "Topic11_GamblerDungeon": "The Gambler's Problem: teaching AI why going to Vegas with your life savings is a mathematically terrible idea.",
    "Topic12_QLearningApplications": "From beating Atari games to optimizing traffic lights, Q-learning is everywhere, judging your suboptimal decisions.",
    "Topic13_QLearningCaseStudies": "Real-world examples of Q-learning where the agent didn't just spin in circles endlessly.",

    "Topic1_ISEvolution": "Intelligent Systems evolved from rigid rule-books to flexible learners that can outsmart us at our own games.",
    "Topic2_IntelligentBehavior": "Defining 'intelligence' is hard. For a thermostat, it's turning off at 72 degrees. For a human, it's not pressing 'Reply All'.",
    "Topic3_TraditionalVsIS": "Traditional systems are like a strict math teacher. Intelligent Systems are like a jazz musician improvising.",
    "Topic4_ISApplications": "They are in your phone, your car, and your fridge. Yes, your smart fridge is definitely judging your midnight snacking.",
    "Topic5_PEASFramework": "Performance, Environment, Actuators, Sensors. It's like the anatomy of a robot, but without the messy biology.",
    "Topic6_AgentTypesReflex": "Simple reflex agents are the knee-jerk reactors of the AI world. 'See fire, run away.' No thinking required.",
    "Topic7_EnvironmentTypes": "Discrete, continuous, episodic... the universe has many flavors, and agents complain about all of them.",
    "Topic8_AgentTypesDetailed": "From simple reflexes to learning agents, it's the evolutionary tree of things that will eventually automate our chores.",
    "Topic9_EnvironmentsDetailed": "Fully observable vs partially observable: the difference between playing chess and playing poker blindfolded.",
    "Topic10_MCIntro": "Monte Carlo methods: named after the casino, because it's literally just taking a bunch of random guesses and hoping for the best.",
    "Topic11_MCBackupDiagrams": "Unlike TD backups that look one step ahead, MC backups wait until the end of the game to figure out if it was a good idea.",
    "Topic12_MCAlgorithms": "The algorithm for the patient agent: 'I'll just wait until I reach the end to see if my life choices were optimal.'",
    "Topic13_MCPrediction": "Predicting the value of a state by just playing it out a thousand times. The ultimate 'let's see what happens' approach.",
    "Topic14_MCControl": "Using random rollouts to steer the ship. It works surprisingly well, assuming you have infinite time and no real-world consequences.",
    "Topic15_EpsilonGreedy": "Epsilon-greedy: spending 90% of your time being smart, and 10% of your time doing something completely random just in case."
};

const modulesDir = path.join(__dirname, 'src', 'modules');
const units = ['unit1', 'unit2', 'unit3', 'unit4'];

units.forEach(unit => {
    const unitDir = path.join(modulesDir, unit);
    if (!fs.existsSync(unitDir)) return;
    const files = fs.readdirSync(unitDir).filter(f => f.endsWith('.tsx'));
    
    files.forEach(file => {
        const filePath = path.join(unitDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        const key = file.replace('.tsx', '');
        const funnyDetail = funnyDetails[key] || "RL is like trying to teach a dog a trick, but the dog is a math equation.";
        
        // Find the storytelling block ending
        // Looking for the closing </div> of the space-y-4 text-slate-700 block or the div wrapper inside the storytelling section.
        // Wait, the structure in Topic1 is:
        // <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
        //    <p>...</p>
        // </div>
        // Let's just look for `badge="Storytelling"` and find the first `<div className="space-y-6">` and append inside it at the very top.
        
        const snippet = `
                    <div className="mt-2 mb-6 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800 shadow-sm flex items-start gap-4 transform hover:scale-[1.02] transition-transform">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-2xl">
                            🎭
                        </div>
                        <div>
                            <h5 className="font-bold text-indigo-900 dark:text-indigo-100 text-sm uppercase tracking-wider mb-1 flex items-center gap-2">
                                Fun Fact / Comic Relief
                            </h5>
                            <p className="text-indigo-700 dark:text-indigo-300 font-medium italic leading-relaxed">
                                "${funnyDetail}"
                            </p>
                        </div>
                    </div>`;

        // We can find the SectionWrapper for Storytelling.
        const storyRegex = /id="story"[\s\S]*?badge="Storytelling"[\s\S]*?>\s*<div className="space-y-6">/;
        
        if (storyRegex.test(content)) {
            if (!content.includes("Fun Fact / Comic Relief")) {
                content = content.replace(storyRegex, (match) => {
                    return match + snippet;
                });
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated ${file}`);
            } else {
                console.log(`Skipped ${file} (already has funny detail)`);
            }
        } else {
            console.log(`Could not find story section in ${file}`);
        }
    });
});

console.log("Done!");
