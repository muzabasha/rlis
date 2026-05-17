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
    // --- Domain 1: Games & Strategy (1-10) ---
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
        id: 'p2',
        domain: 'Games & Strategy',
        title: 'Multi-Agent Predator-Prey',
        instruction: 'Simulate a multi-agent environment where predators must coordinate to catch a faster prey.',
        setup: 'PettingZoo, PyTorch, Ray RLLib',
        methodology: [
            'Setup a gridworld with 3 Predators and 1 Prey.',
            'Use Independent Q-Learning (IQL) for predators.',
            'Implement a sparse reward: +10 if any predator touches the prey.',
            'Prey follows a hard-coded evasion heuristic.'
        ],
        outcome: 'Predators develop encircling behaviors to trap the prey.',
        skeleton: `from pettingzoo.mpe import simple_tag_v2\nenv = simple_tag_v2.env()\nenv.reset()\nfor agent in env.agent_iter():\n    observation, reward, termination, truncation, info = env.last()\n    action = policy(observation)\n    env.step(action)`
    },
    {
        id: 'p3',
        domain: 'Games & Strategy',
        title: 'Tetris Line Optimizer',
        instruction: 'Train an RL agent to maximize the number of lines cleared in Tetris.',
        setup: 'Python-Tetris, Stable-Baselines3, Gym',
        methodology: [
            'State representation: Heights of columns and number of holes.',
            'Action space: Rotation and translation of the current piece.',
            'Reward: +1 for 1 line, +4 for 2 lines, +10 for 3, +30 for 4.',
            'Algorithm: PPO (Proximal Policy Optimization).'
        ],
        outcome: 'Agent clears an average of 50+ lines per game.',
        skeleton: `from stable_baselines3 import PPO\nimport tetris_gym\nenv = tetris_gym.make('Tetris-v0')\nmodel = PPO("MlpPolicy", env, verbose=1)\nmodel.learn(total_timesteps=100000)`
    },
    {
        id: 'p4',
        domain: 'Games & Strategy',
        title: 'Poker Bluffing (CFR)',
        instruction: 'Implement Counterfactual Regret Minimization (CFR) for a 2-player limit Hold\'em.',
        setup: 'Python, NumPy',
        methodology: [
            'Build an Information Set tree for game states.',
            'Calculate regret for each action at each node.',
            'Update strategies based on cumulative regret.',
            'Evaluate against a random opponent.'
        ],
        outcome: 'Agent learns to bluff and fold correctly based on hand strength.',
        skeleton: `class CFRNode:\n    def __init__(self, actions):\n        self.regret_sum = np.zeros(actions)\n        self.strategy_sum = np.zeros(actions)\n    def get_strategy(self, realization_weight): ...`
    },
    {
        id: 'p5',
        domain: 'Games & Strategy',
        title: 'Chess End-Game Solver',
        instruction: 'Train a value network to evaluate King + Rook vs King endgames.',
        setup: 'Python-Chess, PyTorch',
        methodology: [
            'Generate a dataset of legal end-game positions.',
            'Use TD(0) to learn the distance-to-mate value.',
            'State: Piece coordinates (6 inputs).',
            'Reward: -1 per step until mate (+0).'
        ],
        outcome: 'Agent finds the shortest path to checkmate in 95% of cases.',
        skeleton: `import chess\nboard = chess.Board("8/8/8/8/8/k7/1R6/K7 w - - 0 1")\n# Value network training loop`
    },
    {
        id: 'p6',
        domain: 'Games & Strategy',
        title: 'StarCraft Resource Manager',
        instruction: 'Optimize worker distribution between minerals and gas in a simulated environment.',
        setup: 'PySC2, TensorFlow',
        methodology: [
            'State: Current resources and worker counts.',
            'Action: Transfer workers between resource nodes.',
            'Reward: Total resource collection rate.',
            'Algorithm: A3C (Asynchronous Advantage Actor-Critic).'
        ],
        outcome: '15% increase in early-game resource accumulation.',
        skeleton: `from pysc2.env import sc2_env\nenv = sc2_env.SC2Env(map_name="Simple64")\n# Manager logic`
    },
    {
        id: 'p7',
        domain: 'Games & Strategy',
        title: 'Backgammon TD-Gammon',
        instruction: 'Replicate the classic TD-Gammon using TD-lambda.',
        setup: 'Python, NumPy',
        methodology: [
            'Represent board state as a vector of 198 elements.',
            'Use a single hidden layer neural network.',
            'Train through self-play using TD(lambda).',
            'No search tree required.'
        ],
        outcome: 'Agent achieves advanced amateur level play.',
        skeleton: `def td_lambda_update(w, e, delta, grad): ...`
    },
    {
        id: 'p8',
        domain: 'Games & Strategy',
        title: 'Fighting Game Combo Learner',
        instruction: 'Teach an agent to perform maximum-damage combos in a 2D fighter.',
        setup: 'Retro Gym, PyTorch',
        methodology: [
            'Environment: Street Fighter II (via Gym Retro).',
            'Action: Sequence of frame-perfect button presses.',
            'Reward: Damage dealt to the opponent.',
            'Use Genetic Algorithms for sequence discovery.'
        ],
        outcome: 'Agent discovers 10+ hit combos automatically.',
        skeleton: `import retro\nenv = retro.make(game="StreetFighterIISpecialChampionEdition-Genesis')\n# Combo discovery logic`
    },
    {
        id: 'p9',
        domain: 'Games & Strategy',
        title: 'Risk Board Game Strategy',
        instruction: 'Optimize territory reinforcement and attack decisions.',
        setup: 'Python, Risk-Sim',
        methodology: [
            'State: Map ownership and army counts.',
            'Action: Reinforce, Attack, Fortify.',
            'Reward: Territories captured + Continent bonuses.',
            'Algorithm: Double DQN.'
        ],
        outcome: 'Agent learns to hold continents and prioritize weak borders.',
        skeleton: `class RiskEnv(gym.Env):\n    def step(self, action): # Reinforce/Attack logic`
    },
    {
        id: 'p10',
        domain: 'Games & Strategy',
        title: 'Snake AI via Deep RL',
        instruction: 'Classic Snake game optimized to fill the entire board.',
        setup: 'Pygame, PyTorch',
        methodology: [
            'State: Relative position of food and body parts.',
            'Action: Left, Right, Up, Down.',
            'Reward: +10 for food, -100 for wall/body collision.',
            'Train using DQN with prioritized experience replay.'
        ],
        outcome: 'Snake fills 80% of the board without self-collision.',
        skeleton: `def get_state(snake, food): ...`
    },

    // --- Domain 2: Finance & Trading (11-20) ---
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
        id: 'p12',
        domain: 'Finance & Trading',
        title: 'Portfolio Diversification Agent',
        instruction: 'Balance a portfolio of 10 stocks to maximize return while minimizing variance.',
        setup: 'FinRL, Pandas, NumPy',
        methodology: [
            'State: Closing prices, covariance matrix, and current weights.',
            'Action: Target weights for each asset.',
            'Reward: Log-returns of the portfolio.',
            'Algorithm: DDPG (Deep Deterministic Policy Gradient).'
        ],
        outcome: 'Outperforms the S&P 500 index in terms of volatility-adjusted returns.',
        skeleton: `from finrl.agents.stablebaselines3.models import DRLAgent\n# Portfolio env setup`
    },
    {
        id: 'p13',
        domain: 'Finance & Trading',
        title: 'Options Pricing RL',
        instruction: 'Estimate the value of American Options using LSPI (Least Squares Policy Iteration).',
        setup: 'Python, SciPy',
        methodology: [
            'Simulate underlying asset price paths using Geometric Brownian Motion.',
            'State: Time to maturity and current price.',
            'Action: Exercise vs. Hold.',
            'Compare with Black-Scholes benchmark.'
        ],
        outcome: 'Value estimates within 2% of Binomial Tree models.',
        skeleton: `def simulate_paths(S0, mu, sigma, T, steps): ...`
    },
    {
        id: 'p14',
        domain: 'Finance & Trading',
        title: 'Credit Scoring via RL',
        instruction: 'Dynamically adjust credit limits based on customer payment behavior.',
        setup: 'Python, Scikit-learn',
        methodology: [
            'State: Customer income, credit utilization, payment history.',
            'Action: Increase/Decrease/Maintain credit limit.',
            'Reward: Interest earned - Default cost.',
            'Algorithm: Q-Learning with discrete state bins.'
        ],
        outcome: '10% reduction in default rates while maintaining lending volume.',
        skeleton: `def get_reward(action, is_default): ...`
    },
    {
        id: 'p15',
        domain: 'Finance & Trading',
        title: 'Fraud Detection Game',
        instruction: 'Adversarial RL where a fraudster agent learns to bypass a detector agent.',
        setup: 'GAN-based RL, PyTorch',
        methodology: [
            'Fraudster: Generates transaction sequences.',
            'Detector: Classifies as Fraud/Legit.',
            'Minimax training loop.',
            'Evaluate on synthetic credit card dataset.'
        ],
        outcome: 'Detector becomes robust to sophisticated pattern-switching fraud.',
        skeleton: `class FraudAgent(nn.Module): ...\nclass DetectAgent(nn.Module): ...`
    },
    {
        id: 'p16',
        domain: 'Finance & Trading',
        title: 'Market Maker Bot',
        instruction: 'Provide liquidity to an order book while managing inventory risk.',
        setup: 'Gym-LOB, Python',
        methodology: [
            'State: Order book depth and current inventory position.',
            'Action: Bid/Ask spread and size.',
            'Reward: Spread capture - Inventory pnl variance.',
            'Algorithm: PPO.'
        ],
        outcome: 'Bot maintains a neutral position while capturing 5bps per trade.',
        skeleton: `def order_book_step(action): ...`
    },
    {
        id: 'p17',
        domain: 'Finance & Trading',
        title: 'Real Estate Appraisal AI',
        instruction: 'Value properties based on market trends and neighbor features.',
        setup: 'Python, XGBoost + RL',
        methodology: [
            'Represent houses as states in a Markov process.',
            'Action: Sell price recommendation.',
            'Reward: Sales success + Profit margin.',
            'Use Fitted Q-Iteration.'
        ],
        outcome: 'Accurate pricing within 5% of final sales price.',
        skeleton: `model = XGBRegressor()\n# RL wrapper for house sales`
    },
    {
        id: 'p18',
        domain: 'Finance & Trading',
        title: 'Sentiment-Driven Trader',
        instruction: 'Incorporate news sentiment as a state in an RL trading agent.',
        setup: 'BERT, SB3, yfinance',
        methodology: [
            'Process news headlines using BERT to get sentiment scores.',
            'Append sentiment to OHLCV state vector.',
            'Train SAC agent to trade on high-volatility news events.',
            'Compare with technical-only baseline.'
        ],
        outcome: 'Significant alpha during earnings report season.',
        skeleton: `sentiment = bert_model(news_text)\nstate = np.append(price_data, sentiment)`
    },
    {
        id: 'p19',
        domain: 'Finance & Trading',
        title: 'Tax Optimization Agent',
        instruction: 'Minimize tax liability for high-net-worth individuals via asset harvesting.',
        setup: 'Python, CVXPY',
        methodology: [
            'State: Unrealized gains, income brackets, and time to year-end.',
            'Action: Select lots to sell/re-invest.',
            'Reward: Post-tax net worth maximization.',
            'Algorithm: DQN.'
        ],
        outcome: '5% increase in annual post-tax returns via strategic loss harvesting.',
        skeleton: `def calculate_tax(sales): ...`
    },
    {
        id: 'p20',
        domain: 'Finance & Trading',
        title: 'Insurance Premium Optimizer',
        instruction: 'Set dynamic insurance premiums based on risk profiles and churn probability.',
        setup: 'Python, MLflow',
        methodology: [
            'State: Policyholder age, driving records, and recent claims.',
            'Action: Premium price adjustment.',
            'Reward: Long-term LTV (Life Time Value).',
            'Algorithm: Soft Actor-Critic.'
        ],
        outcome: 'Optimized balance between market competitiveness and solvency.',
        skeleton: `def ltv_reward(premium, churn_prob): ...`
    },

    // --- Domain 3: Robotics & Autonomous Systems (21-30) ---
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
        id: 'p22',
        domain: 'Robotics & Autonomous Systems',
        title: 'Bipedal Walker Stabilization',
        instruction: 'Teach a 2D bipedal robot to walk over rough terrain.',
        setup: 'Gymnasium (Box2D), Stable-Baselines3',
        methodology: [
            'State: Lidar readings, angles of joints, and angular velocities.',
            'Action: Torque applied to 4 motors.',
            'Reward: Distance traveled - torque used - impact penalty.',
            'Algorithm: PPO.'
        ],
        outcome: 'Agent learns a stable gait that navigates stairs and pits.',
        skeleton: `env = gym.make("BipedalWalker-v3")\nmodel = PPO("MlpPolicy", env)\nmodel.learn(200000)`
    },
    {
        id: 'p23',
        domain: 'Robotics & Autonomous Systems',
        title: 'Robotic Arm Fruit Picking',
        instruction: 'Control a 6-DOF arm to identify and pick ripe fruit from a tree.',
        setup: 'PyBullet, OpenCV',
        methodology: [
            'Use vision-based RL (Pixels-to-Control).',
            'CNN processes camera feed to identify fruit coordinates.',
            'Inverse Kinematics reward for reaching the target.',
            'Train using TD3 (Twin Delayed DDPG).'
        ],
        outcome: '90% success rate in picking fruit without damaging the tree.',
        skeleton: `import pybullet as p\n# Vision + Control loop`
    },
    {
        id: 'p24',
        domain: 'Robotics & Autonomous Systems',
        title: 'Self-Driving Lane Follower',
        instruction: 'Maintain lane center on a highway with varying curvature.',
        setup: 'CARLA Simulator, PyTorch',
        methodology: [
            'State: Semantic segmentation map of the road.',
            'Action: Steering angle and throttle.',
            'Reward: Alignment with lane center - jerking penalty.',
            'Train using DDPG.'
        ],
        outcome: 'Smooth lane keeping at 100km/h in diverse weather conditions.',
        skeleton: `def lane_reward(position, target_lane): ...`
    },
    {
        id: 'p25',
        domain: 'Robotics & Autonomous Systems',
        title: 'Swarm Logistics Coordination',
        instruction: 'Coordinate 10 mini-bots to move boxes in a warehouse without gridlocks.',
        setup: 'Multi-Agent Gym, Ray RLLib',
        methodology: [
            'Agents observe local neighbors only (Partial Observability).',
            'Reward: Global task completion + local collision avoidance.',
            'Algorithm: MAPPO (Multi-Agent PPO).',
            'Implement communication channels between bots.'
        ],
        outcome: 'Efficient movement patterns emerge (lanes/roundabouts).',
        skeleton: `config = {"multiagent": {"policies": {...}, "policy_mapping_fn": ...}}`
    },
    {
        id: 'p26',
        domain: 'Robotics & Autonomous Systems',
        title: 'Warehouse Sortation Agent',
        instruction: 'Optimize the movement of a high-speed sorting arm for package routing.',
        setup: 'Mujoco, Python',
        methodology: [
            'State: Package destination and current arm position.',
            'Action: High-speed joint actuation.',
            'Reward: Packages correctly sorted per minute.',
            'Train using SAC.'
        ],
        outcome: '30% increase in packages sorted compared to PID controllers.',
        skeleton: `def sort_reward(package_id, bin_id): ...`
    },
    {
        id: 'p27',
        domain: 'Robotics & Autonomous Systems',
        title: 'AUV Pathing (Underwater)',
        instruction: 'Navigate an Autonomous Underwater Vehicle through coral reefs.',
        setup: 'Holoocean Simulator',
        methodology: [
            'State: Sonar readings and depth pressure.',
            'Action: Thruster forces (continuous).',
            'Reward: Target proximity - current resistance penalty.',
            'Algorithm: TD3.'
        ],
        outcome: 'Agent learns to use underwater currents to save battery.',
        skeleton: `client = holoocean.make("SimpleUnderwater")`
    },
    {
        id: 'p28',
        domain: 'Robotics & Autonomous Systems',
        title: 'Satellite Attitude Control',
        instruction: 'Maintain a specific orientation of a satellite using reaction wheels.',
        setup: 'Python, NASA SPICE',
        methodology: [
            'State: Quaternions representing orientation.',
            'Action: Torque pulses to reaction wheels.',
            'Reward: Zero-pointing error + fuel efficiency.',
            'Algorithm: PPO.'
        ],
        outcome: 'Precision orientation within 0.01 degrees.',
        skeleton: `def orientation_error(q_target, q_current): ...`
    },
    {
        id: 'p29',
        domain: 'Robotics & Autonomous Systems',
        title: 'Mars Rover Pathfinding',
        instruction: 'Navigate rocky terrain on Mars with limited battery and steep slopes.',
        setup: 'Python, Terrain-Sim',
        methodology: [
            'State: Slope gradient, rock density, and solar power levels.',
            'Action: Steering and power distribution to wheels.',
            'Reward: Scientific targets reached - energy spent.',
            'Algorithm: Q-Learning with neural approximation.'
        ],
        outcome: 'Rover avoids hazardous slopes while hitting all scientific targets.',
        skeleton: `def energy_cost(slope, speed): ...`
    },
    {
        id: 'p30',
        domain: 'Robotics & Autonomous Systems',
        title: 'Hexapod Gait Discovery',
        instruction: 'Teach a 6-legged robot to walk, crawl, and turn from scratch.',
        setup: 'Mujoco, Python',
        methodology: [
            'State: 18 joint angles and center of mass acceleration.',
            'Action: Target joint positions.',
            'Reward: Forward velocity - ground impact noise.',
            'Algorithm: SAC.'
        ],
        outcome: 'Robot discovers a stable "tripod gait" autonomously.',
        skeleton: `def gait_reward(com_vel): return com_vel.x`
    },

    // --- Domain 4: Healthcare & Life Sciences (31-40) ---
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
        id: 'p32',
        domain: 'Healthcare & Life Sciences',
        title: 'Sepsis Treatment Optimizer',
        instruction: 'Determine optimal fluid and vasopressor dosages for ICU patients.',
        setup: 'MIMIC-III Dataset, Python',
        methodology: [
            'Extract patient trajectories from MIMIC-III database.',
            'State: Vital signs, lab results (lactate, creatinine).',
            'Action: Dosage levels of Vasopressors.',
            'Reward: Patient survival / Discharge status.',
            'Algorithm: Batch RL (Fitted Q-Iteration).'
        ],
        outcome: 'Treatment policy that significantly correlates with improved survival rates.',
        skeleton: `def state_representation(vitals, labs): ...`
    },
    {
        id: 'p33',
        domain: 'Healthcare & Life Sciences',
        title: 'MRI Scan Segmentation RL',
        instruction: 'RL agent that moves "bounding boxes" to segment brain tumors.',
        setup: 'Python, PyTorch, BRATS Dataset',
        methodology: [
            'Environment: 3D MRI volume.',
            'Action: Move/Resize a 3D box.',
            'Reward: IoU (Intersection over Union) with ground truth.',
            'Algorithm: DQN.'
        ],
        outcome: 'Human-level accuracy in localizing small lesions.',
        skeleton: `def iou_reward(box, ground_truth): ...`
    },
    {
        id: 'p34',
        domain: 'Healthcare & Life Sciences',
        title: 'Protein Folding Prediction',
        instruction: 'Simplified RL model to find the minimum energy conformation of a peptide chain.',
        setup: 'Python, Biopython',
        methodology: [
            'State: Torsion angles of the amino acid sequence.',
            'Action: Rotate a specific bond.',
            'Reward: Negative Gibbs free energy.',
            'Algorithm: PPO.'
        ],
        outcome: 'Finds native-like structures for short peptide sequences.',
        skeleton: `def energy_function(angles): ...`
    },
    {
        id: 'p35',
        domain: 'Healthcare & Life Sciences',
        title: 'Drug Molecule Generator',
        instruction: 'Generate SMILES strings for molecules with high binding affinity to a target.',
        setup: 'RDKit, PyTorch',
        methodology: [
            'State: Partial SMILES string.',
            'Action: Append next atom/bond.',
            'Reward: QED (Drug-likeness) + Docking score.',
            'Algorithm: REINFORCE.'
        ],
        outcome: 'Discovers novel molecule candidates for specific viral proteins.',
        skeleton: `def reward(smiles): return docking_score(smiles)`
    },
    {
        id: 'p36',
        domain: 'Healthcare & Life Sciences',
        title: 'Adaptive Prosthetic Control',
        instruction: 'Sync robotic knee movement with the user\'s walking intent.',
        setup: 'Python, EMG sensor data',
        methodology: [
            'State: EMG signal patterns and limb angle.',
            'Action: Hydraulic resistance level.',
            'Reward: Smoothness of gait + Metabolic cost reduction.',
            'Algorithm: SAC.'
        ],
        outcome: 'Natural walking pattern achieved within 5 minutes of calibration.',
        skeleton: `def emg_to_state(signal): ...`
    },
    {
        id: 'p37',
        domain: 'Healthcare & Life Sciences',
        title: 'Hospital Bed Allocation',
        instruction: 'Manage ER bed assignments to minimize patient wait time.',
        setup: 'SimPy, Python',
        methodology: [
            'State: ER occupancy, severity of incoming patients.',
            'Action: Assign to Bed/Wait/Transfer.',
            'Reward: -WaitTime - MortalityRisk.',
            'Algorithm: Double DQN.'
        ],
        outcome: '20% reduction in average ER waiting time.',
        skeleton: `def er_step(state, action): ...`
    },
    {
        id: 'p38',
        domain: 'Healthcare & Life Sciences',
        title: 'Clinical Trial Recruiter',
        instruction: 'Identify best patient cohorts for clinical trials to maximize success probability.',
        setup: 'Python, Synthetic Patient Data',
        methodology: [
            'State: Cohort demographics and disease markers.',
            'Action: Include/Exclude patient.',
            'Reward: Trial completion + Positive outcome.',
            'Algorithm: Contextual Bandits.'
        ],
        outcome: 'Higher trial efficacy and lower dropout rates.',
        skeleton: `def patient_match_score(features): ...`
    },
    {
        id: 'p39',
        domain: 'Healthcare & Life Sciences',
        title: 'Epidemic Spread Mitigation',
        instruction: 'Determine optimal lockdown timing and intensity to flatten the curve.',
        setup: 'SIR Model + RL',
        methodology: [
            'State: Infected/Recovered counts, hospital capacity.',
            'Action: Restriction level (0-10).',
            'Reward: -DeathCount - EconomicLoss.',
            'Algorithm: PPO.'
        ],
        outcome: 'Discovers nuanced strategies that balance health and economy.',
        skeleton: `def sir_update(state, action): ...`
    },
    {
        id: 'p40',
        domain: 'Healthcare & Life Sciences',
        title: 'Genomic Alignment Optimizer',
        instruction: 'RL agent that finds the optimal alignment between DNA sequences.',
        setup: 'Python, BioPython',
        methodology: [
            'State: Current alignment position.',
            'Action: Insert gap / Shift sequence.',
            'Reward: Match score - Gap penalty.',
            'Algorithm: Q-Learning.'
        ],
        outcome: 'Competitive with Smith-Waterman for large sequences.',
        skeleton: `def alignment_score(s1, s2): ...`
    },

    // --- Domain 5: Smart Infrastructure & Energy (41-50) ---
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
        id: 'p42',
        domain: 'Smart Infrastructure & Energy',
        title: 'Traffic Signal Timing',
        instruction: 'Minimize vehicle delay at a complex intersection using multi-agent RL.',
        setup: 'SUMO Simulator, TraCI',
        methodology: [
            'State: Queue length and waiting time for each lane.',
            'Action: Green light phase duration.',
            'Reward: Negative sum of waiting times.',
            'Algorithm: Independent Q-Learning.'
        ],
        outcome: '15% reduction in CO2 emissions due to decreased idling.',
        skeleton: `import traci\n# Control loop for traffic lights`
    },
    {
        id: 'p43',
        domain: 'Smart Infrastructure & Energy',
        title: 'HVAC Energy Saver',
        instruction: 'Optimize building temperature for comfort while minimizing power usage.',
        setup: 'EnergyPlus, Python',
        methodology: [
            'State: External temp, internal occupancy, energy price.',
            'Action: Setpoint temperature.',
            'Reward: -EnergyCost - ComfortPenalty.',
            'Algorithm: SAC.'
        ],
        outcome: '25% reduction in annual heating/cooling costs.',
        skeleton: `def comfort_score(temp): ...`
    },
    {
        id: 'p44',
        domain: 'Smart Infrastructure & Energy',
        title: 'Waste Management Route Optimizer',
        instruction: 'Dynamic routing for garbage trucks based on bin fill levels.',
        setup: 'Python, Google OR-Tools + RL',
        methodology: [
            'State: IoT sensor data from bins across the city.',
            'Action: Sequence of bin visits.',
            'Reward: -FuelUsed - BinOverflowPenalty.',
            'Algorithm: Deep Reinforcement Learning for VRP.'
        ],
        outcome: '10% reduction in fleet operational costs.',
        skeleton: `def route_reward(dist, overflow): ...`
    },
    {
        id: 'p45',
        domain: 'Smart Infrastructure & Energy',
        title: 'Smart Street-Lighting Control',
        instruction: 'Adjust brightness based on pedestrian and vehicle traffic.',
        setup: 'Python, IoT Sim',
        methodology: [
            'State: Camera-based occupancy counts.',
            'Action: Dimming level (0-100%).',
            'Reward: Energy saved + Safety index.',
            'Algorithm: DQN.'
        ],
        outcome: '40% energy saving compared to fixed schedule lighting.',
        skeleton: `def safety_reward(light, traffic): ...`
    },
    {
        id: 'p46',
        domain: 'Smart Infrastructure & Energy',
        title: 'Water Leak Detector',
        instruction: 'RL agent that monitors pressure sensors to identify leaks in a city network.',
        setup: 'EPANET, Python',
        methodology: [
            'State: Time-series pressure data.',
            'Action: Trigger alarm / Inspect zone.',
            'Reward: +100 for true leak, -50 for false alarm.',
            'Algorithm: DQN.'
        ],
        outcome: 'Leak detection time reduced by 5 hours on average.',
        skeleton: `def pressure_anomaly(state): ...`
    },
    {
        id: 'p47',
        domain: 'Smart Infrastructure & Energy',
        title: 'Elevator Group Control',
        instruction: 'Minimize passenger waiting and travel time in a 50-story building.',
        setup: 'Elevator-Gym, Python',
        methodology: [
            'State: Current floor and destination of all passengers.',
            'Action: Select which elevator responds to a hall call.',
            'Reward: -WaitingTime - TravelTime.',
            'Algorithm: Multi-agent PPO.'
        ],
        outcome: 'Wait time reduction of 30% during peak hours.',
        skeleton: `def dispatch_action(calls, elevators): ...`
    },
    {
        id: 'p48',
        domain: 'Smart Infrastructure & Energy',
        title: 'EV Charging Scheduler',
        instruction: 'Schedule electric vehicle charging to coincide with low grid prices.',
        setup: 'Python, Pandas',
        methodology: [
            'State: Battery SOC, Departure time, Energy price forecast.',
            'Action: Charge rate (kW).',
            'Reward: -TotalCost - IncompleteChargePenalty.',
            'Algorithm: DDPG.'
        ],
        outcome: '15% lower charging costs for EV owners.',
        skeleton: `def charge_reward(cost, soc_final): ...`
    },
    {
        id: 'p49',
        domain: 'Smart Infrastructure & Energy',
        title: '5G Network Slicing',
        instruction: 'Allocate bandwidth to different services (Video vs IoT) dynamically.',
        setup: 'Python, NS-3',
        methodology: [
            'State: Network congestion, latency, and packet loss.',
            'Action: Bandwidth allocation ratio.',
            'Reward: QoS (Quality of Service) score.',
            'Algorithm: SAC.'
        ],
        outcome: 'Better resource utilization and zero SLA violations.',
        skeleton: `def qos_reward(latency, drop_rate): ...`
    },
    {
        id: 'p50',
        domain: 'Smart Infrastructure & Energy',
        title: 'Disaster Response Logistics',
        instruction: 'Deploy rescue drones and supplies after a flood using RL.',
        setup: 'Python, GIS data',
        methodology: [
            'State: Population density and damage map.',
            'Action: Deployment coordinates for supplies.',
            'Reward: Lives saved - Resource waste.',
            'Algorithm: Multi-agent PPO.'
        ],
        outcome: 'Optimized response time in critical zones.',
        skeleton: `def rescue_score(location, time): ...`
    },

    // --- Domain 6: Human-AI & NLP (51-60) ---
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
    },
    {
        id: 'p52',
        domain: 'Human-AI & NLP',
        title: 'Contextual Bandit Recommender',
        instruction: 'Personalize a news feed based on user reading habits.',
        setup: 'Python, Scikit-learn, Spacey',
        methodology: [
            'Extract article features using NLP (TF-IDF).',
            'Action: Recommend 1 of 5 articles.',
            'Reward: User Click (1) / No Click (0).',
            'Algorithm: LinUCB.'
        ],
        outcome: '25% increase in CTR (Click-Through Rate).',
        skeleton: `from contextualbandits.online import LinUCB`
    },
    {
        id: 'p53',
        domain: 'Human-AI & NLP',
        title: 'Text Summarizer with RL',
        instruction: 'Fine-tune a T5 model to generate summaries with high ROUGE scores.',
        setup: 'HuggingFace, PyTorch',
        methodology: [
            'Initial training via supervised learning.',
            'Fine-tune using RL with ROUGE-L as the reward.',
            'State: Input text. Action: Generated token.',
            'Algorithm: PPO.'
        ],
        outcome: 'Summaries are more concise and factually accurate.',
        skeleton: `def rouge_reward(pred, target): ...`
    },
    {
        id: 'p54',
        domain: 'Human-AI & NLP',
        title: 'Code Debugging Assistant',
        instruction: 'RL agent that suggests code fixes to resolve syntax errors.',
        setup: 'Tree-Sitter, Python',
        methodology: [
            'State: AST (Abstract Syntax Tree) of buggy code.',
            'Action: Tree transformation (Edit/Delete/Insert).',
            'Reward: Program compiles + Passes unit tests.',
            'Algorithm: Graph Neural Network + RL.'
        ],
        outcome: 'Solves 40% of basic competitive programming bugs.',
        skeleton: `def ast_reward(compiles, tests): ...`
    },
    {
        id: 'p55',
        domain: 'Human-AI & NLP',
        title: 'Adaptive E-Learning Path',
        instruction: 'Personalize the order of lesson modules based on student performance.',
        setup: 'Python, Student logs',
        methodology: [
            'State: Student knowledge level and quiz history.',
            'Action: Recommend next topic.',
            'Reward: Quiz score improvement + Engagement time.',
            'Algorithm: DQN.'
        ],
        outcome: 'Students finish courses 20% faster with higher retention.',
        skeleton: `def knowledge_gain(pre_test, post_test): ...`
    },
    {
        id: 'p56',
        domain: 'Human-AI & NLP',
        title: 'Music Composition Agent',
        instruction: 'Generate MIDI sequences that follow music theory rules.',
        setup: 'Music21, PyTorch',
        methodology: [
            'State: Last 8 notes played.',
            'Action: Next Note / Duration.',
            'Reward: Harmonic consonance + Rhythm consistency.',
            'Algorithm: Deep Q-Learning.'
        ],
        outcome: 'Pleasant, coherent 30-second piano melodies.',
        skeleton: `def harmony_reward(notes): ...`
    },
    {
        id: 'p57',
        domain: 'Human-AI & NLP',
        title: 'Game Level Generator',
        instruction: 'RL agent that designs "fair" but "challenging" Mario-style levels.',
        setup: 'Python, PCG-RL',
        methodology: [
            'State: Current tile map.',
            'Action: Place block / enemy / pipe.',
            'Reward: Playability (can reach goal) + Difficulty score.',
            'Algorithm: PPO.'
        ],
        outcome: 'Infinite variety of playable levels.',
        skeleton: `def playability_check(level_map): ...`
    },
    {
        id: 'p58',
        domain: 'Human-AI & NLP',
        title: 'Style-Transfer Filter Learner',
        instruction: 'Optimize image filter parameters to match a target artistic style.',
        setup: 'OpenCV, PyTorch',
        methodology: [
            'State: Current image pixels.',
            'Action: Adjust Contrast/Saturation/Brightness.',
            'Reward: VGG-19 Style Loss minimization.',
            'Algorithm: SAC.'
        ],
        outcome: 'Real-time style transfer without heavy neural networks.',
        skeleton: `def style_loss(img, target): ...`
    },
    {
        id: 'p59',
        domain: 'Human-AI & NLP',
        title: 'Language Translation Tuner',
        instruction: 'Optimize machine translation for specific domains (e.g., Medical).',
        setup: 'OpenNMT, RL',
        methodology: [
            'State: Source sentence.',
            'Action: Translated word choice.',
            'Reward: Domain-specific BLEU score.',
            'Algorithm: REINFORCE.'
        ],
        outcome: 'High accuracy on technical terminology.',
        skeleton: `def medical_bleu(pred, target): ...`
    },
    {
        id: 'p60',
        domain: 'Human-AI & NLP',
        title: 'Fake News Detector Game',
        instruction: 'Adversarial RL: Fact-checker vs. Misinformation generator.',
        setup: 'Python, BERT',
        methodology: [
            'Generator: Tries to write convincing fake news.',
            'Checker: Tries to flag it using knowledge base.',
            'Minimax training.',
            'Evaluate on real-world datasets.'
        ],
        outcome: 'Checker develops robust feature extraction for deepfake text.',
        skeleton: `def detection_accuracy(flags, ground_truth): ...`
    }
];
