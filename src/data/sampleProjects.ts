export interface Project {
    id: string;
    domain: string;
    title: string;
    instruction: string;
    setup: string;
    methodology: string[];
    outcome: string;
    skeleton: string;
}

export const sampleProjects: Project[] = [
    {
        id: 'p1',
        domain: 'Games & Strategy',
        title: 'Deep Q-Checkers',
        instruction: 'Build an RL agent that learns to play Checkers using Deep Q-Networks (DQN).',
        setup: 'Python 3.9, Gymnasium, PyTorch, NumPy',
        methodology: [
            'Initialize an 8x8 grid environment for Checkers.',
            'Implement a CNN-based DQN architecture to process board states.',
            'Define rewards for capturing pieces (+1) and winning (+10).',
            'Train using experience replay and a target network.'
        ],
        outcome: 'An agent capable of beating heuristic-based opponents within 50,000 episodes.',
        skeleton: `import gymnasium as gym\nimport torch\nimport torch.nn as nn\n\nclass DQN(nn.Module):\n    def __init__(self, state_size, action_size):\n        super(DQN, self).__init__()\n        self.fc = nn.Sequential(\n            nn.Linear(state_size, 128),\n            nn.ReLU(),\n            nn.Linear(128, action_size)\n        )\n    def forward(self, x): return self.fc(x)\n\n# Main training logic here`
    },
    {
        id: 'p11',
        domain: 'Finance & Trading',
        title: 'High-Frequency Crypto Trader',
        instruction: 'Optimize entry/exit points for BTC/USDT using price-action states and RL.',
        setup: 'Python, yfinance, Stable-Baselines3, Gym-Anytrading',
        methodology: [
            'Fetch historical BTC data using yfinance.',
            'Calculate technical indicators like RSI and MACD as features.',
            'Train a PPO agent to maximize the Sharpe Ratio.',
            'Backtest on unseen test data.'
        ],
        outcome: 'Achieved a positive risk-adjusted return (Sharpe > 1.0) on historical test data.',
        skeleton: `from stable_baselines3 import PPO\nimport gym_anytrading\n\nenv = gym.make('forex-v0', frame_bound=(50, 1000), window_size=10)\nmodel = PPO("MlpPolicy", env, verbose=1)\nmodel.learn(total_timesteps=10000)`
    },
    {
        id: 'p21',
        domain: 'Robotics & Autonomous Systems',
        title: 'Drone Obstacle Avoidance',
        instruction: 'Navigate a 3D space with dynamic obstacles using Lidar inputs.',
        setup: 'Python, AirSim, Gazebo, ROS',
        methodology: [
            'Simulate 3D environment with random moving obstacles.',
            'Map 360-degree rangefinder data to the state space.',
            'Implement a reward function penalizing collisions (-100) and rewarding progress (+1).',
            'Train using Soft Actor-Critic (SAC) for continuous control.'
        ],
        outcome: 'Zero collisions over a 1km autonomous flight in a cluttered environment.',
        skeleton: `# Pseudo-code for AirSim RL\nimport airsim\nclient = airsim.MultirotorClient()\ndef step(action):\n    client.moveByVelocityAsync(action.vx, action.vy, action.vz, duration=0.1)\n    # Get reward based on distance to goal and collision sensor`
    },
    {
        id: 'p31',
        domain: 'Healthcare & Life Sciences',
        title: 'Adaptive Insulin Dosing',
        instruction: 'Maintain blood glucose levels in Type 1 Diabetes patients.',
        setup: 'Python, Simglucose library, Gymnasium',
        methodology: [
            'Model continuous glucose monitor (CGM) readings as state.',
            'Define action as insulin bolus amount (continuous).',
            'Reward function: Time in Healthy Range (TIR) maximization.',
            'Apply DDPG (Deep Deterministic Policy Gradient) for dosing control.'
        ],
        outcome: '30% reduction in hypoglycemic events compared to baseline bolus calculators.',
        skeleton: `from simglucose.env.simglucose_gym_env import T1DSimEnv\nfrom stable_baselines3 import DDPG\n\nenv = T1DSimEnv()\nmodel = DDPG("MlpPolicy", env, verbose=1)\nmodel.learn(total_timesteps=20000)`
    },
    {
        id: 'p41',
        domain: 'Smart Infrastructure & Energy',
        title: 'Smart Grid Load Balancing',
        instruction: 'Balance power supply from renewables with residential demand.',
        setup: 'Python, Gym-Electric-Market, Pandas',
        methodology: [
            'Model grid state: Solar/Wind output, current residential load.',
            'Action space: Dynamic pricing adjustments to influence demand.',
            'Reward: Grid stability (minimized peak load) + total revenue.',
            'Train using A2C (Advantage Actor-Critic).'
        ],
        outcome: '20% reduction in peak load stress and improved renewable energy utilization.',
        skeleton: `import gym_electric_market as gem\nfrom stable_baselines3 import A2C\n\nenv = gem.make('ElectricMarket-v0')\nmodel = A2C("MlpPolicy", env, verbose=1)\nmodel.learn(total_timesteps=50000)`
    },
    {
        id: 'p51',
        domain: 'Human-AI & NLP',
        title: 'Goal-Oriented Dialogue System',
        instruction: 'RL-based chatbot that helps users book flights in minimum turns.',
        setup: 'Python, Rasa, DeepPavlov, Transformers',
        methodology: [
            'Define dialogue states based on slot-filling (Origin, Destination, Date).',
            'Actions: Ask for slot, Confirm booking, End dialogue.',
            'Reward: +20 for success, -1 per turn (efficiency).',
            'Train using Policy Gradient methods on user simulator data.'
        ],
        outcome: '15% faster task completion and higher user satisfaction than rule-based bots.',
        skeleton: `import transformers\n# RL loop for dialogue management\ndef dialogue_step(state):\n    action_probs = model(state)\n    action = sample(action_probs)\n    return action\n# Reward = success - turn_count`
    }
];
