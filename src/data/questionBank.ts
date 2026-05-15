export interface Question {
    id: string;
    unit: number;
    title: string;
    scenario: string;
    question: string;
    solution: string;
    markingScheme: string[];
}

export const questionBank: Question[] = [
    {
        "id": "u1q1",
        "unit": 1,
        "title": "The E-commerce Personalization Dilemma",
        "scenario": "An e-commerce platform uses RL to recommend products. It faces a conflict between recommending popular items (exploitation) and testing new niche items (exploration).",
        "question": "Analyze the Exploration-Exploitation trade-off in this context. Propose a mathematical strategy (e.g., epsilon-greedy) to balance this and explain how \"Regret\" is minimized over time.",
        "solution": "Exploitation maximizes short-term revenue using known popular items; Exploration discovers potentially higher-value niche items. A strategy like epsilon-greedy with a decaying epsilon ensures that exploration happens early but exploitation dominates as confidence grows, minimizing cumulative regret.",
        "markingScheme": [
            "Scenario Analysis (3 Marks)",
            "Strategy Formulation (3 Marks)",
            "Regret Explanation (2 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u1q2",
        "unit": 1,
        "title": "RL vs. Supervised Learning in Clinical Trials",
        "scenario": "A pharmaceutical company wants to optimize drug dosage for chronic patients.",
        "question": "Justify why Reinforcement Learning is superior to Supervised Learning for this sequential decision-making task. Highlight the role of \"Delayed Rewards\" and \"Feedback Loops.\"",
        "solution": "Unlike Supervised Learning, which requires pre-labeled correct actions, RL optimizes a sequence of decisions where the consequence of a dose is only seen much later. This handling of temporal dependencies and feedback loops is critical for patient health trajectories.",
        "markingScheme": [
            "Comparison (4 Marks)",
            "Delayed Reward Role (3 Marks)",
            "Trajectory Concept (3 Marks)"
        ]
    },
    {
        "id": "u1q3",
        "unit": 1,
        "title": "Elements of RL in Self-Driving Cars",
        "scenario": "A self-driving car is learning to navigate a busy intersection.",
        "question": "Map the following elements to the scenario: Agent, Environment, State Space, Action Space, and Reward Function. Design a reward function that prevents collisions while ensuring speed.",
        "solution": "Agent: The car's AI controller. Env: Road and traffic. State: Position, velocity, sensor data. Action: Accelerate, brake, steer. Reward: +1 for progress, -100 for collision, -5 for traffic violation, -0.1 per step (time penalty).",
        "markingScheme": [
            "Correct Mapping (5 Marks)",
            "Reward Function Design (3 Marks)",
            "Justification (2 Marks)"
        ]
    },
    {
        "id": "u1q4",
        "unit": 1,
        "title": "HOT Concept: Critiquing Epsilon-Greedy in Continuous Spaces (U1-4)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 1. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u1q5",
        "unit": 1,
        "title": "HOT Concept: Comparing Value Iteration vs. Policy Iteration (U1-5)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 1. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u1q6",
        "unit": 1,
        "title": "HOT Concept: Identifying Markov Transitions from Data (U1-6)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 1. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u1q7",
        "unit": 1,
        "title": "HOT Concept: Evaluating Q-Table Memory Constraints (U1-7)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 1. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u1q8",
        "unit": 1,
        "title": "HOT Concept: Assessing Policy Gradient Fundamentals (U1-8)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 1. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u1q9",
        "unit": 1,
        "title": "HOT Concept: Formulating a Grid-World MDP (U1-9)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 1. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u1q10",
        "unit": 1,
        "title": "HOT Concept: Determining the Optimal Gamma Discount Factor (U1-10)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 1. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u1q11",
        "unit": 1,
        "title": "HOT Concept: Predicting Convergence Rates in Temporal Difference (U1-11)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 1. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u1q12",
        "unit": 1,
        "title": "HOT Concept: Analyzing Sparse vs Dense Rewards (U1-12)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 1. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u1q13",
        "unit": 1,
        "title": "HOT Concept: Evaluating State Spaces and Dimensionality (U1-13)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 1. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u1q14",
        "unit": 1,
        "title": "HOT Concept: Analyzing the Reward Hypothesis (U1-14)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 1. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u1q15",
        "unit": 1,
        "title": "HOT Concept: Applying the Bellman Optimality Equation (U1-15)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 1. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u2q1",
        "unit": 2,
        "title": "The Markov Property in Weather Forecasting",
        "scenario": "A meteorologist says \"Tomorrow's weather depends only on today's humidity and pressure, regardless of what happened last week.\"",
        "question": "Define the Markov Property formally. If the meteorologist's claim is true, represent the system as a Transition Probability Matrix for three states: Sunny, Rainy, Cloudy.",
        "solution": "Markov Property: P(S_{t+1} | S_t) = P(S_{t+1} | S_t, S_{t-1}, ..., S_0). The system can be represented as a 3x3 stochastic matrix where each row sums to 1, representing probabilities of moving between Sunny, Rainy, and Cloudy states.",
        "markingScheme": [
            "Formal Definition (4 Marks)",
            "Matrix Structure (3 Marks)",
            "Row Sum Property (3 Marks)"
        ]
    },
    {
        "id": "u2q2",
        "unit": 2,
        "title": "Modeling a Smart Warehouse Robot",
        "scenario": "A robot moves in a 3x3 grid to pick items.",
        "question": "Define the MDP Tuple <S, A, P, R, gamma> for this robot. What happens to the robot's behavior if gamma = 0 vs. gamma = 0.99?",
        "solution": "S: 9 grid cells. A: N, S, E, W. P: Probability of movement success. R: +10 for goal, -1 for wall. If gamma = 0, the robot is myopic and cares only about immediate rewards. If gamma = 0.99, it is far-sighted and plans long paths to maximize total discounted reward.",
        "markingScheme": [
            "Tuple Definition (5 Marks)",
            "Gamma Analysis (5 Marks)"
        ]
    },
    {
        "id": "u2q3",
        "unit": 2,
        "title": "HOT Concept: Designing Heuristic Reward Functions (U2-3)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 2. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u2q4",
        "unit": 2,
        "title": "HOT Concept: Critiquing Epsilon-Greedy in Continuous Spaces (U2-4)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 2. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u2q5",
        "unit": 2,
        "title": "HOT Concept: Comparing Value Iteration vs. Policy Iteration (U2-5)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 2. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u2q6",
        "unit": 2,
        "title": "HOT Concept: Identifying Markov Transitions from Data (U2-6)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 2. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u2q7",
        "unit": 2,
        "title": "HOT Concept: Evaluating Q-Table Memory Constraints (U2-7)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 2. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u2q8",
        "unit": 2,
        "title": "HOT Concept: Assessing Policy Gradient Fundamentals (U2-8)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 2. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u2q9",
        "unit": 2,
        "title": "HOT Concept: Formulating a Grid-World MDP (U2-9)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 2. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u2q10",
        "unit": 2,
        "title": "HOT Concept: Determining the Optimal Gamma Discount Factor (U2-10)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 2. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u2q11",
        "unit": 2,
        "title": "HOT Concept: Predicting Convergence Rates in Temporal Difference (U2-11)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 2. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u2q12",
        "unit": 2,
        "title": "HOT Concept: Analyzing Sparse vs Dense Rewards (U2-12)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 2. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u2q13",
        "unit": 2,
        "title": "HOT Concept: Evaluating State Spaces and Dimensionality (U2-13)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 2. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u2q14",
        "unit": 2,
        "title": "HOT Concept: Analyzing the Reward Hypothesis (U2-14)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 2. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u2q15",
        "unit": 2,
        "title": "HOT Concept: Applying the Bellman Optimality Equation (U2-15)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 2. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u3q1",
        "unit": 3,
        "title": "Q-Learning in a Dynamic Maze",
        "scenario": "An agent is in a maze where the exit moves every 100 steps.",
        "question": "Explain the Q-learning update rule. Discuss why the agent might fail to find the exit if the learning rate alpha is too small or if it stops exploring.",
        "solution": "Update Rule: Q(s,a) = Q(s,a) + alpha[r + gamma*maxQ(s',a') - Q(s,a)]. Small alpha leads to slow adaptation to the moving exit; lack of exploration prevents discovery of the new exit location after it moves.",
        "markingScheme": [
            "Formula (4 Marks)",
            "Alpha analysis (3 Marks)",
            "Exploration analysis (3 Marks)"
        ]
    },
    {
        "id": "u3q2",
        "unit": 3,
        "title": "Off-policy vs. On-policy (Q-Learning vs. SARSA)",
        "scenario": "A robot is learning to walk.",
        "question": "Explain why Q-learning is called \"Off-policy\" while SARSA is \"On-policy.\" Which one is \"safer\" during training and why?",
        "solution": "Q-Learning is off-policy because it learns about the optimal policy while following an exploratory one (using max over actions). SARSA is on-policy because it learns about the policy it actually follows (using the next action taken). SARSA is safer because it accounts for the potential costs of exploratory actions during the learning process.",
        "markingScheme": [
            "Comparison (6 Marks)",
            "Safety Analysis (4 Marks)"
        ]
    },
    {
        "id": "u3q3",
        "unit": 3,
        "title": "HOT Concept: Designing Heuristic Reward Functions (U3-3)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 3. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u3q4",
        "unit": 3,
        "title": "HOT Concept: Critiquing Epsilon-Greedy in Continuous Spaces (U3-4)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 3. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u3q5",
        "unit": 3,
        "title": "HOT Concept: Comparing Value Iteration vs. Policy Iteration (U3-5)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 3. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u3q6",
        "unit": 3,
        "title": "HOT Concept: Identifying Markov Transitions from Data (U3-6)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 3. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u3q7",
        "unit": 3,
        "title": "HOT Concept: Evaluating Q-Table Memory Constraints (U3-7)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 3. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u3q8",
        "unit": 3,
        "title": "HOT Concept: Assessing Policy Gradient Fundamentals (U3-8)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 3. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u3q9",
        "unit": 3,
        "title": "HOT Concept: Formulating a Grid-World MDP (U3-9)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 3. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u3q10",
        "unit": 3,
        "title": "HOT Concept: Determining the Optimal Gamma Discount Factor (U3-10)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 3. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u3q11",
        "unit": 3,
        "title": "HOT Concept: Predicting Convergence Rates in Temporal Difference (U3-11)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 3. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u3q12",
        "unit": 3,
        "title": "HOT Concept: Analyzing Sparse vs Dense Rewards (U3-12)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 3. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u3q13",
        "unit": 3,
        "title": "HOT Concept: Evaluating State Spaces and Dimensionality (U3-13)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 3. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u3q14",
        "unit": 3,
        "title": "HOT Concept: Analyzing the Reward Hypothesis (U3-14)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 3. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u3q15",
        "unit": 3,
        "title": "HOT Concept: Applying the Bellman Optimality Equation (U3-15)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 3. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u4q1",
        "unit": 4,
        "title": "PEAS for a Surgical Robot",
        "scenario": "A robot is performing a micro-surgery on a heart.",
        "question": "Define the PEAS (Performance, Environment, Actuators, Sensors) framework for this robot. Is the environment \"Observability\" high or low? Justify.",
        "solution": "P: Precision/Success rate. E: Human heart/OR. A: Robotic arms/scalpels. S: Cameras/force sensors. Observability is \"Partial\" because the agent cannot see through all tissues or predict internal biological shifts perfectly.",
        "markingScheme": [
            "PEAS mapping (6 Marks)",
            "Observability justification (4 Marks)"
        ]
    },
    {
        "id": "u4q2",
        "unit": 4,
        "title": "First-visit vs. Every-visit Monte Carlo",
        "scenario": "An agent visits state s twice in a single episode. G1 = 10, G2 = 5.",
        "question": "Calculate the value estimate V(s) using both First-visit and Every-visit MC. Which one is generally preferred for simpler implementation?",
        "solution": "First-visit: V(s) = 10 (ignores subsequent visits). Every-visit: V(s) = (10+5)/2 = 7.5 (averages all visits). First-visit is often preferred for simplicity and unbiasedness in specific cases.",
        "markingScheme": [
            "Calculations (6 Marks)",
            "Comparison (4 Marks)"
        ]
    },
    {
        "id": "u4q3",
        "unit": 4,
        "title": "HOT Concept: Designing Heuristic Reward Functions (U4-3)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 4. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u4q4",
        "unit": 4,
        "title": "HOT Concept: Critiquing Epsilon-Greedy in Continuous Spaces (U4-4)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 4. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u4q5",
        "unit": 4,
        "title": "HOT Concept: Comparing Value Iteration vs. Policy Iteration (U4-5)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 4. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u4q6",
        "unit": 4,
        "title": "HOT Concept: Identifying Markov Transitions from Data (U4-6)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 4. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u4q7",
        "unit": 4,
        "title": "HOT Concept: Evaluating Q-Table Memory Constraints (U4-7)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 4. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u4q8",
        "unit": 4,
        "title": "HOT Concept: Assessing Policy Gradient Fundamentals (U4-8)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 4. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u4q9",
        "unit": 4,
        "title": "HOT Concept: Formulating a Grid-World MDP (U4-9)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 4. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u4q10",
        "unit": 4,
        "title": "HOT Concept: Determining the Optimal Gamma Discount Factor (U4-10)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 4. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u4q11",
        "unit": 4,
        "title": "HOT Concept: Predicting Convergence Rates in Temporal Difference (U4-11)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 4. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u4q12",
        "unit": 4,
        "title": "HOT Concept: Analyzing Sparse vs Dense Rewards (U4-12)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 4. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u4q13",
        "unit": 4,
        "title": "HOT Concept: Evaluating State Spaces and Dimensionality (U4-13)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 4. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u4q14",
        "unit": 4,
        "title": "HOT Concept: Analyzing the Reward Hypothesis (U4-14)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 4. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    },
    {
        "id": "u4q15",
        "unit": 4,
        "title": "HOT Concept: Applying the Bellman Optimality Equation (U4-15)",
        "scenario": "Consider a scenario focusing on advanced RL principles related to Unit 4. The agent faces an ambiguous state space and delayed feedback.",
        "question": "Evaluate the impact of changing the underlying assumptions of the environment in this context. How does it affect the optimal policy?",
        "solution": "A detailed analysis requires comparing the expected returns before and after the change. By applying the Bellman equations, we can see that the value function shifts, altering the optimal action selection.",
        "markingScheme": [
            "Theoretical Setup (4 Marks)",
            "Mathematical Analysis (4 Marks)",
            "Conclusion (2 Marks)"
        ]
    }
];
