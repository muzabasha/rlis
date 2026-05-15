import { Question } from '../questionBank';

export const unit1Questions: Question[] = [
    {
        id: 'u1q1',
        unit: 1,
        title: 'The E-commerce Personalization Dilemma',
        scenario: 'An e-commerce platform uses RL to recommend products. It faces a conflict between recommending popular items (exploitation) and testing new niche items (exploration).',
        question: 'Analyze the Exploration-Exploitation trade-off in this context. Propose a mathematical strategy (e.g., epsilon-greedy) to balance this and explain how "Regret" is minimized over time.',
        solution: 'Exploitation maximizes short-term revenue using known popular items; Exploration discovers potentially higher-value niche items. A strategy like epsilon-greedy with a decaying epsilon ensures that exploration happens early but exploitation dominates as confidence grows, minimizing cumulative regret.',
        markingScheme: ['Scenario Analysis (3 Marks)', 'Strategy Formulation (3 Marks)', 'Regret Explanation (2 Marks)', 'Conclusion (2 Marks)']
    },
    {
        id: 'u1q2',
        unit: 1,
        title: 'RL vs. Supervised Learning in Clinical Trials',
        scenario: 'A pharmaceutical company wants to optimize drug dosage for chronic patients.',
        question: 'Justify why Reinforcement Learning is superior to Supervised Learning for this sequential decision-making task. Highlight the role of "Delayed Rewards" and "Feedback Loops."',
        solution: 'Unlike Supervised Learning, which requires pre-labeled correct actions, RL optimizes a sequence of decisions where the consequence of a dose is only seen much later. This handling of temporal dependencies and feedback loops is critical for patient health trajectories.',
        markingScheme: ['Comparison (4 Marks)', 'Delayed Reward Role (3 Marks)', 'Trajectory Concept (3 Marks)']
    },
    {
        id: 'u1q3',
        unit: 1,
        title: 'Elements of RL in Self-Driving Cars',
        scenario: 'A self-driving car is learning to navigate a busy intersection.',
        question: 'Map the following elements to the scenario: Agent, Environment, State Space, Action Space, and Reward Function. Design a reward function that prevents collisions while ensuring speed.',
        solution: 'Agent: The car\'s AI controller. Env: Road and traffic. State: Position, velocity, sensor data. Action: Accelerate, brake, steer. Reward: +1 for progress, -100 for collision, -5 for traffic violation, -0.1 per step (time penalty).',
        markingScheme: ['Correct Mapping (5 Marks)', 'Reward Function Design (3 Marks)', 'Justification (2 Marks)']
    },
    {
        id: 'u1q4',
        unit: 1,
        title: 'Evaluating an Autonomous Trading Bot',
        scenario: 'A trading bot is trained using RL. In its first year, it loses money but gathers significant market data. In the second year, it turns highly profitable.',
        question: 'Discuss how the concepts of "Episodic vs. Continuing Tasks" apply here. Is trading better modeled as episodic or continuing, and why?',
        solution: 'Trading is best modeled as a Continuing Task because there is no natural terminal state (the market never "resets"). However, it is often artificially chunked into episodes (e.g., daily or yearly trading sessions) to allow for easier computation of returns and policy updates.',
        markingScheme: ['Definitions (3 Marks)', 'Application to Trading (4 Marks)', 'Justification (3 Marks)']
    },
    {
        id: 'u1q5',
        unit: 1,
        title: 'The Multi-Armed Bandit in Online Advertising',
        scenario: 'An ad network has 5 different ads for a new smartphone. They want to maximize clicks.',
        question: 'Explain how the k-armed bandit problem models this scenario. Contrast the UCB (Upper Confidence Bound) action selection method with simple Epsilon-Greedy in this context.',
        solution: 'The 5 ads are the "arms". Epsilon-Greedy explores randomly, which might waste time on clearly bad ads. UCB explores based on the uncertainty (variance) of the ad\'s performance, smartly preferring ads that have high potential but fewer impressions, thus optimizing exploration.',
        markingScheme: ['Bandit Formulation (3 Marks)', 'Epsilon-Greedy explanation (3 Marks)', 'UCB explanation and comparison (4 Marks)']
    },
    {
        id: 'u1q6',
        unit: 1,
        title: 'Policy vs. Value Functions in Robotics',
        scenario: 'A robotic arm is learning to sort packages. The engineers are debating whether to use a Value-based approach or a Policy-based approach.',
        question: 'Define both a Policy Function and a Value Function. Under what circumstances would a Policy-based approach be more advantageous for this robotic arm?',
        solution: 'Value Function: Estimates expected return from a state. Policy Function: Maps states directly to actions. Policy-based is better here because robotic arm control involves a high-dimensional, continuous action space (e.g., precise joint torques), which is computationally expensive to derive from a Value Function using a max operation.',
        markingScheme: ['Definitions (4 Marks)', 'Continuous Action Space argument (4 Marks)', 'Conclusion (2 Marks)']
    },
    {
        id: 'u1q7',
        unit: 1,
        title: 'Reward Shaping in Game AI',
        scenario: 'An AI playing a platformer game is only rewarded (+100) when it finishes the level. It struggles to learn.',
        question: 'Identify the problem with this reward structure. Propose a "Reward Shaping" strategy and discuss the potential risk of "Reward Hacking" with your new strategy.',
        solution: 'The problem is "Sparse Rewards". The agent rarely sees the reward, making learning slow. Shaping: Add dense intermediate rewards (+1 for collecting coins, +5 for passing checkpoints). Risk: The agent might learn to endlessly collect respawning coins without ever finishing the level (Reward Hacking).',
        markingScheme: ['Identifying Sparse Rewards (3 Marks)', 'Shaping Strategy (4 Marks)', 'Reward Hacking Risk (3 Marks)']
    },
    {
        id: 'u1q8',
        unit: 1,
        title: 'Model-Based vs. Model-Free RL',
        scenario: 'You are designing an RL agent for a nuclear reactor control system where physical trials are dangerous.',
        question: 'Differentiate between Model-Based and Model-Free RL. Which approach is mandatory for this scenario and why? How does simulated planning play a role?',
        solution: 'Model-Free learns via trial-and-error without understanding environment dynamics. Model-Based learns the transition dynamics (the "model") and uses it to plan. Model-Based is mandatory here because we can simulate the reactor\'s physics to learn safe policies offline without risking an actual meltdown.',
        markingScheme: ['Differentiation (4 Marks)', 'Application to Reactor (3 Marks)', 'Role of Planning (3 Marks)']
    },
    {
        id: 'u1q9',
        unit: 1,
        title: 'Discount Factor (Gamma) Sensitivity',
        scenario: 'An agent is navigating a maze to find a treasure. The designers set the discount factor gamma = 0.1.',
        question: 'Analyze the impact of this gamma value on the agent\'s behavior. If the treasure requires 50 steps to reach, what will the agent likely do?',
        solution: 'A gamma of 0.1 makes the agent highly myopic (short-sighted). It heavily discounts future rewards. If the treasure is 50 steps away, the discounted value of the treasure is effectively zero (0.1^50). The agent will likely ignore the treasure and favor immediate, even if smaller, local rewards, or wander aimlessly.',
        markingScheme: ['Gamma Definition (3 Marks)', 'Myopic Behavior Analysis (4 Marks)', 'Specific 50-step conclusion (3 Marks)']
    },
    {
        id: 'u1q10',
        unit: 1,
        title: 'The Credit Assignment Problem',
        scenario: 'In a game of Chess, an RL agent plays 60 moves. It sacrifices its Queen on move 20 and ultimately wins the game on move 60.',
        question: 'Explain the "Credit Assignment Problem" using this scenario. How do RL algorithms attempt to solve it?',
        solution: 'The problem: Which of the 60 moves contributed to the win? Was sacrificing the Queen on move 20 a brilliant strategy or a mistake overcome by later moves? RL solves this using Value Functions (estimating the value of the state at move 20 based on future expected rewards) and mechanisms like Temporal Difference learning to propagate the final reward backwards to earlier states.',
        markingScheme: ['Problem Definition (4 Marks)', 'Application to Scenario (3 Marks)', 'RL Solution Mechanism (3 Marks)']
    },
    {
        id: 'u1q11',
        unit: 1,
        title: 'Environment Observability',
        scenario: 'Consider a Poker-playing AI vs. a Chess-playing AI.',
        question: 'Classify the environment for both games based on Observability (Fully vs. Partially Observable). How does this classification impact the state representation required for the Poker AI?',
        solution: 'Chess is Fully Observable (all pieces are visible). Poker is Partially Observable (opponents\' cards are hidden). For Poker, the state representation cannot just be the current board; it must include a history of actions (betting patterns) or a belief state (probabilities of opponents\' hands) to make optimal decisions.',
        markingScheme: ['Classification (4 Marks)', 'Impact on State Representation (4 Marks)', 'Belief State/History concept (2 Marks)']
    },
    {
        id: 'u1q12',
        unit: 1,
        title: 'Stochastic vs. Deterministic Environments',
        scenario: 'An agent learns to control a drone. In simulation, wind is zero. In reality, wind gusts occur randomly.',
        question: 'Explain the difference between deterministic and stochastic environments. How does the transition from simulation to reality affect the agent\'s learned policy?',
        solution: 'Deterministic: An action in a state always leads to the exact same next state. Stochastic: Transitions have inherent randomness (probabilities). A policy trained in a deterministic simulation may fail in reality because it hasn\'t learned to recover from unexpected state changes caused by the stochastic wind.',
        markingScheme: ['Definitions (4 Marks)', 'Sim2Real Gap Analysis (4 Marks)', 'Policy Robustness (2 Marks)']
    },
    {
        id: 'u1q13',
        unit: 1,
        title: 'Action Spaces: Discrete vs. Continuous',
        scenario: 'Compare an AI playing Pac-Man with an AI controlling a self-driving car\'s steering wheel.',
        question: 'Define discrete and continuous action spaces. Why might standard Q-Learning fail for the self-driving car, and what is the architectural solution?',
        solution: 'Pac-Man uses Discrete actions (Up, Down, Left, Right). Steering is Continuous (infinite angles between -30 and +30 degrees). Standard Q-Learning relies on finding the maximum Q-value across all discrete actions, which is impossible/intractable for infinite continuous actions. The solution is using Policy Gradient methods (like DDPG or SAC) that output continuous action vectors directly.',
        markingScheme: ['Definitions (3 Marks)', 'Q-Learning Limitation (4 Marks)', 'Architectural Solution (3 Marks)']
    },
    {
        id: 'u1q14',
        unit: 1,
        title: 'The Role of the Reward Signal',
        scenario: 'A researcher trains a cleaning robot by giving it +1 reward for picking up trash and -1 for dropping trash.',
        question: 'The robot learns to pick up a piece of trash, drop it, and pick it up again infinitely. What is this phenomenon called? How should the reward function be redesigned to achieve the actual goal (a clean room)?',
        solution: 'This is "Reward Hacking" or "Specification Gaming". The agent exploits the poorly designed reward function. To fix it, the reward should be based on the *state* of the environment, not the *action*. E.g., +10 when the room is fully clean, or +1 for the total number of items currently in the bin, without penalties for dropping that can be exploited in a cycle.',
        markingScheme: ['Phenomenon Identification (3 Marks)', 'Explanation of Exploit (3 Marks)', 'Redesign Strategy (4 Marks)']
    },
    {
        id: 'u1q15',
        unit: 1,
        title: 'Stationary vs. Non-Stationary Environments',
        scenario: 'An RL algorithmic trading bot is highly successful in 2021 but loses heavily in 2023 without any code changes.',
        question: 'Explain the concept of Non-Stationary environments. What algorithmic adjustments (e.g., regarding learning rate or historical data) are necessary to handle non-stationarity?',
        solution: 'Non-Stationary means the underlying dynamics and reward probabilities of the environment change over time (e.g., market behavior shifts). To handle this, the agent must continually adapt. Adjustments include using a constant learning rate (alpha) rather than a decaying one (so it never stops learning), or using a sliding window of recent experience rather than equally weighting all historical data.',
        markingScheme: ['Concept Explanation (4 Marks)', 'Algorithmic Adjustments (4 Marks)', 'Justification (2 Marks)']
    }
];
