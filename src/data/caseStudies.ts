export interface CaseStudy {
    id: string;
    unit: number;
    title: string;
    motivation: string;
    problemStatement: string;
    objectives: string[];
    technicalDetails: string;
    methodology: string;
    challenges: string[];
    budget: string;
    timeline: string;
    outcomes: string;
    application: string;
    socialImpact: string;
    industryPartners: string[];
}

export const caseStudies: CaseStudy[] = [
    {
        "id": "u1cs1",
        "unit": 1,
        "title": "AlphaGo: Mastering the Game of Go",
        "motivation": "Traditional heuristic search failed to master Go due to its massive state space. A breakthrough in AI was needed to show machines could handle intuition-heavy tasks.",
        "problemStatement": "Develop an intelligent system capable of beating a human world champion in the game of Go without relying solely on brute-force search.",
        "objectives": [
            "Defeat a professional Go player.",
            "Combine deep neural networks with reinforcement learning.",
            "Evaluate board positions efficiently."
        ],
        "technicalDetails": "State Space: 10^170 possible positions. Action Space: 361 intersections. Reward: +1 for win, -1 for loss.",
        "methodology": "Supervised learning on human expert moves followed by Reinforcement Learning via self-play. Used Monte Carlo Tree Search (MCTS) combined with Policy and Value Networks.",
        "challenges": [
            "Massive computational requirements.",
            "Sparse and delayed rewards (only at the end of the game).",
            "Evaluating non-intuitive states."
        ],
        "budget": "$25-35 Million (Compute and R&D)",
        "timeline": "2-3 Years",
        "outcomes": "Defeated Lee Sedol 4-1 in 2016. Proved deep RL can solve problems previously thought to be decades away.",
        "application": "Strategic planning, structural biology (later AlphaFold), and complex decision-making.",
        "socialImpact": "Inspired global interest in AI and accelerated AI investments across industries.",
        "industryPartners": [
            "DeepMind",
            "Google"
        ]
    },
    {
        "id": "u1cs2",
        "unit": 1,
        "title": "Autonomous Data Center Cooling",
        "motivation": "Data centers consume massive amounts of global electricity. Traditional PID controllers couldn't predict and adapt to dynamic thermal loads efficiently.",
        "problemStatement": "Optimize the cooling systems of massive server farms to reduce energy consumption without risking server overheating.",
        "objectives": [
            "Reduce cooling energy by at least 30%.",
            "Maintain strict temperature safety thresholds.",
            "Automate the control of valves, pumps, and fans."
        ],
        "technicalDetails": "State Space: IT load, outside weather, pressure. Actions: Adjusting cooling equipment. Reward: Negative energy cost minus penalty for violating thermal constraints.",
        "methodology": "Deep Reinforcement Learning agent trained on historical sensor data to predict PUE (Power Usage Effectiveness) and dynamically adjust cooling infrastructure.",
        "challenges": [
            "Safety constraints: an RL mistake could cause millions in hardware damage.",
            "Non-stationary environment due to weather changes."
        ],
        "budget": "$5-10 Million (Implementation and Integration)",
        "timeline": "18 Months",
        "outcomes": "Achieved a 40% reduction in cooling energy, translating to a 15% overall energy overhead reduction.",
        "application": "Industrial HVAC systems, smart building management, manufacturing plant cooling.",
        "socialImpact": "Massive reduction in carbon footprint, promoting sustainable tech scaling.",
        "industryPartners": [
            "Google",
            "DeepMind"
        ]
    },
    {
        "id": "u1cs3",
        "unit": 1,
        "title": "Alibaba City Brain: Traffic Control",
        "motivation": "Urban congestion causes severe economic loss, pollution, and delayed emergency response. Static traffic lights cannot adapt to real-time flow.",
        "problemStatement": "Dynamically control traffic light phases across an entire city grid to minimize waiting times and clear paths for ambulances.",
        "objectives": [
            "Reduce average commute times.",
            "Ensure emergency vehicles pass without delay.",
            "Process real-time camera feeds efficiently."
        ],
        "technicalDetails": "State: Real-time traffic volume, queue length per lane. Action: Duration of green lights. Reward: Negative sum of vehicle waiting times.",
        "methodology": "Multi-agent reinforcement learning where each intersection acts as an agent, sharing state information with neighbors to coordinate green waves.",
        "challenges": [
            "High latency in processing thousands of video feeds.",
            "Coordinating multiple agents without causing instability in adjacent intersections."
        ],
        "budget": "$50 Million+",
        "timeline": "3 Years",
        "outcomes": "Increased traffic speed by 15%, reduced ambulance arrival time by 50%.",
        "application": "Smart city infrastructure, toll optimization, public transit routing.",
        "socialImpact": "Reduced urban pollution from idling cars, saved lives through faster emergency response.",
        "industryPartners": [
            "Alibaba Cloud",
            "Hangzhou City Government"
        ]
    },
    {
        "id": "u1cs4",
        "unit": 1,
        "title": "Personalized Content Recommendation",
        "motivation": "Users face choice paralysis with millions of items available. Traditional collaborative filtering struggles with sequential user intent and long-term engagement.",
        "problemStatement": "Design an agent that recommends a sequence of items to maximize user engagement and lifetime value rather than just immediate clicks.",
        "objectives": [
            "Increase user retention.",
            "Balance exploration of new content with exploitation of known preferences.",
            "Handle cold-start problems for new users."
        ],
        "technicalDetails": "State: User watch/purchase history, demographic profile. Action: Display specific catalog items. Reward: Watch time or purchase value.",
        "methodology": "Contextual Bandits and Deep Q-Networks (DQN). The agent treats the user as the environment and recommendations as actions, learning from user feedback (clicks/ignores).",
        "challenges": [
            "Massive action spaces (millions of items).",
            "Delayed reward (long-term subscription retention vs short-term clickbait)."
        ],
        "budget": "$10-20 Million (Infrastructure and R&D)",
        "timeline": "Ongoing (Iterative releases every 6 months)",
        "outcomes": "Significant increase in user engagement; accounts for over 80% of content discovered on platforms like Netflix.",
        "application": "E-commerce, streaming platforms, news aggregation.",
        "socialImpact": "Shapes culture and information consumption, though it requires mitigation against echo chambers.",
        "industryPartners": [
            "Netflix",
            "Amazon",
            "Spotify"
        ]
    },
    {
        "id": "u2cs1",
        "unit": 2,
        "title": "Adaptive Inventory Management",
        "motivation": "Retailers lose billions annually due to overstocking (waste) and understocking (lost sales). Supply chains are highly stochastic.",
        "problemStatement": "Determine the optimal ordering policy for thousands of SKUs across multiple warehouses dealing with uncertain demand and lead times.",
        "objectives": [
            "Minimize holding costs.",
            "Prevent stockouts.",
            "Automate purchasing decisions across a complex supply chain."
        ],
        "technicalDetails": "State: Current inventory level, pipeline orders, seasonal demand forecast. Action: Quantity to order today. Reward: Sales profit minus holding and penalty costs.",
        "methodology": "Formulated as a Markov Decision Process (MDP). Solved using Approximate Dynamic Programming and Deep RL to handle the high dimensionality of states and actions.",
        "challenges": [
            "Curse of dimensionality (too many products and stores).",
            "Non-stationary demand distributions (e.g., pandemic shocks)."
        ],
        "budget": "$15 Million",
        "timeline": "2 Years",
        "outcomes": "Reduced inventory holding costs by 20% while improving in-stock availability by 5%.",
        "application": "Retail, pharmaceutical supply chains, manufacturing logistics.",
        "socialImpact": "Reduces food and material waste significantly, creating a more sustainable economy.",
        "industryPartners": [
            "Walmart",
            "Blue Yonder"
        ]
    },
    {
        "id": "u2cs2",
        "unit": 2,
        "title": "Adaptive Packet Routing in Networks",
        "motivation": "Internet traffic fluctuates unpredictably. Static routing tables lead to bottlenecks, packet loss, and high latency during peak loads.",
        "problemStatement": "Create an autonomous routing protocol that dynamically forwards packets to avoid congested nodes in real time.",
        "objectives": [
            "Minimize end-to-end packet latency.",
            "Maximize network throughput.",
            "Adapt immediately to node failures."
        ],
        "technicalDetails": "State: Queue lengths at routers, link bandwidth utilization. Action: Next-hop router selection. Reward: Negative latency or penalty for dropped packets.",
        "methodology": "Modeled as an MDP. Routers act as independent agents using Q-routing to learn the value (delay) of paths through the network.",
        "challenges": [
            "Stale state information due to propagation delay.",
            "Risk of routing loops if value functions converge poorly."
        ],
        "budget": "$8 Million",
        "timeline": "1.5 Years",
        "outcomes": "Achieved 25% lower latency during traffic bursts compared to standard OSPF protocols.",
        "application": "Telecommunications, cloud provider backbones, 5G slicing.",
        "socialImpact": "Enables reliable high-bandwidth applications like remote surgery and autonomous driving.",
        "industryPartners": [
            "Cisco",
            "Juniper Networks"
        ]
    },
    {
        "id": "u2cs3",
        "unit": 2,
        "title": "Dynamic Patient Treatment Trajectories",
        "motivation": "Chronic diseases like sepsis or diabetes require continuous adjustment of treatments based on evolving patient vitals.",
        "problemStatement": "Find an optimal sequential treatment policy that maximizes patient survival probability rather than just treating immediate symptoms.",
        "objectives": [
            "Stabilize patient vitals.",
            "Minimize toxic side-effects of drugs.",
            "Determine the precise timing of interventions."
        ],
        "technicalDetails": "State: Patient vitals, lab results, demographic data. Action: Drug dosage levels, fluid intake. Reward: +100 for survival/discharge, negative penalties for deterioration.",
        "methodology": "MDP framework using Offline RL (Fitted Q-Iteration) trained on retrospective ICU databases (like MIMIC-III) to evaluate state values without risking live patients.",
        "challenges": [
            "Cannot explore on live patients safely.",
            "State space is partially observable and highly noisy."
        ],
        "budget": "$12 Million (Research grants and computing)",
        "timeline": "4 Years (including clinical validation)",
        "outcomes": "RL policies recommended treatments that correlated with up to 30% lower mortality rates compared to human clinician baselines in simulated evaluations.",
        "application": "ICU monitoring, chronic disease management, personalized medicine.",
        "socialImpact": "Saves lives by providing doctors with data-driven, long-term prognostic recommendations.",
        "industryPartners": [
            "MIT CSAIL",
            "Various Research Hospitals"
        ]
    },
    {
        "id": "u2cs4",
        "unit": 2,
        "title": "Smart Grid Energy Distribution (Autobidder)",
        "motivation": "Renewable energy (solar/wind) is intermittent. Battery storage must be charged and discharged at optimal times to balance the grid and maximize profit.",
        "problemStatement": "Autonomously manage grid-scale battery systems to buy cheap energy and sell high while stabilizing grid frequency.",
        "objectives": [
            "Maximize revenue from energy arbitrage.",
            "Ensure battery health.",
            "Provide grid stability during frequency drops."
        ],
        "technicalDetails": "State: Battery State of Charge (SOC), current grid price, weather forecast. Action: Charge, Discharge, or Hold. Reward: Financial profit.",
        "methodology": "MDP solved with RL. The agent predicts transition probabilities of market prices and takes actions that maximize expected discounted returns.",
        "challenges": [
            "Highly volatile energy markets.",
            "Battery degradation costs must be factored into the reward function accurately."
        ],
        "budget": "$20 Million",
        "timeline": "2 Years",
        "outcomes": "Consistently outperforms traditional human-managed trading, maximizing ROI for utility-scale battery deployments.",
        "application": "Energy trading, microgrid management, home battery systems (Powerwall).",
        "socialImpact": "Accelerates the transition to renewable energy by making grid storage economically viable.",
        "industryPartners": [
            "Tesla (Autobidder)",
            "Hornsdale Power Reserve"
        ]
    },
    {
        "id": "u3cs1",
        "unit": 3,
        "title": "Self-Driving Car Navigation (Waymo)",
        "motivation": "Driving requires complex, sequential decision-making in highly unpredictable environments with pedestrians and other drivers.",
        "problemStatement": "Develop a policy that can navigate a vehicle safely from point A to B while adhering to traffic laws and avoiding collisions.",
        "objectives": [
            "Zero collisions.",
            "Smooth acceleration and braking (comfort).",
            "Reach destination efficiently."
        ],
        "technicalDetails": "State: Lidar point clouds, camera feeds, radar, map data. Action: Steering angle, throttle, brake. Reward: Progress towards goal minus heavy penalties for infractions/collisions.",
        "methodology": "Continuous Q-Learning (DDPG/SAC) and Policy Gradient methods combined with imitation learning from expert human drivers.",
        "challenges": [
            "The \"long tail\" of edge cases (unusual accidents, unpredictable pedestrians).",
            "Sim-to-real transfer gap."
        ],
        "budget": "$2+ Billion",
        "timeline": "10+ Years",
        "outcomes": "Fully autonomous commercial robotaxi services operating safely in multiple cities.",
        "application": "Robotaxis, autonomous trucking, delivery bots.",
        "socialImpact": "Potential to drastically reduce traffic fatalities and provide mobility to the elderly/disabled.",
        "industryPartners": [
            "Waymo",
            "Cruise"
        ]
    },
    {
        "id": "u3cs2",
        "unit": 3,
        "title": "Robotic Dexterous Manipulation",
        "motivation": "Traditional robotics rely on hard-coded kinematics which fail when handling novel, asymmetrical, or soft objects.",
        "problemStatement": "Train a robotic hand to manipulate objects (like solving a Rubik's cube) with human-like dexterity using only visual and proprioceptive feedback.",
        "objectives": [
            "Achieve precise finger coordination.",
            "Adapt to unexpected perturbations (e.g., dropping the object).",
            "Generalize across different object shapes."
        ],
        "technicalDetails": "State: Joint angles, velocities, camera images of the object. Action: Torques applied to 20+ joints. Reward: Distance to target orientation.",
        "methodology": "Proximal Policy Optimization (PPO) combined with Automatic Domain Randomization (ADR) in simulation, followed by zero-shot transfer to the physical robot.",
        "challenges": [
            "Sim-to-real gap.",
            "High-dimensional continuous action spaces.",
            "Extreme sample inefficiency of RL."
        ],
        "budget": "$15 Million",
        "timeline": "2.5 Years",
        "outcomes": "Successfully solved a Rubik's cube one-handed and adapted to having fingers tied together or wearing a glove.",
        "application": "Manufacturing assembly, prosthetics, household helper robots.",
        "socialImpact": "Paves the way for versatile, adaptable robots that can safely operate in human-centric environments.",
        "industryPartners": [
            "OpenAI",
            "Shadow Robot Company"
        ]
    },
    {
        "id": "u3cs3",
        "unit": 3,
        "title": "High-Frequency Trading Execution",
        "motivation": "Institutional investors executing large block orders cause market impact (slippage), resulting in suboptimal execution prices.",
        "problemStatement": "Determine the optimal schedule to break down and execute a large order over a specific time window to minimize market impact.",
        "objectives": [
            "Minimize execution shortfall.",
            "Hide intent from predatory trading algorithms.",
            "Adapt to intraday volatility."
        ],
        "technicalDetails": "State: Remaining inventory, time remaining, order book depth, spread. Action: Size of the slice to trade at the current tick. Reward: Difference between execution price and arrival price.",
        "methodology": "Q-Learning and Actor-Critic methods to learn an execution policy that balances taking liquidity vs waiting for better prices.",
        "challenges": [
            "Extremely noisy reward signals.",
            "Adversarial market environment (other bots adapting to your strategy)."
        ],
        "budget": "$30+ Million (Proprietary R&D)",
        "timeline": "Continuous Development",
        "outcomes": "Consistent reduction in execution costs by several basis points, saving millions annually on large institutional trades.",
        "application": "Algorithmic trading, portfolio rebalancing, market making.",
        "socialImpact": "Increases market efficiency and liquidity, though it raises concerns about market fairness.",
        "industryPartners": [
            "JPMorgan (LOXM)",
            "Jane Street"
        ]
    },
    {
        "id": "u3cs4",
        "unit": 3,
        "title": "Automated Logistics & Warehouse Routing",
        "motivation": "E-commerce demands rapid fulfillment. Hundreds of robots moving simultaneously in a warehouse often cause traffic jams and deadlocks.",
        "problemStatement": "Coordinate a fleet of autonomous mobile robots (AMRs) to fetch inventory pods and bring them to human pickers efficiently.",
        "objectives": [
            "Maximize throughput (items picked per hour).",
            "Ensure zero collisions.",
            "Optimize battery usage of the fleet."
        ],
        "technicalDetails": "State: Grid map, position and destination of all robots. Action: Move Up/Down/Left/Right/Wait. Reward: Global throughput minus local traffic penalties.",
        "methodology": "Multi-Agent Q-Learning and decentralized policy execution where robots learn to yield, form lanes, and avoid congested aisles autonomously.",
        "challenges": [
            "Curse of dimensionality as the number of agents increases.",
            "Deadlocks when multiple agents block each other in narrow aisles."
        ],
        "budget": "$100+ Million",
        "timeline": "4 Years",
        "outcomes": "Warehouse throughput increased by 300% compared to manual picking, with smooth, collision-free robot traffic.",
        "application": "E-commerce fulfillment, automated ports, factory intralogistics.",
        "socialImpact": "Transforms supply chain efficiency, enabling next-day delivery globally, though it shifts labor dynamics.",
        "industryPartners": [
            "Amazon Robotics",
            "Kiva Systems"
        ]
    },
    {
        "id": "u4cs1",
        "unit": 4,
        "title": "Drone Swarm Search and Rescue",
        "motivation": "During natural disasters, searching vast areas for survivors using single, manually controlled drones is too slow and inefficient.",
        "problemStatement": "Deploy a decentralized swarm of autonomous drones to map a disaster zone and locate survivors in minimal time.",
        "objectives": [
            "Maximize area coverage.",
            "Identify human thermal signatures.",
            "Maintain communication mesh network."
        ],
        "technicalDetails": "State: Local camera/thermal feed, relative position of neighbors. Action: Navigation vectors. Reward: Discovery of a target and exploration of unseen areas.",
        "methodology": "Multi-Agent Monte Carlo methods and independent PPO. Agents use Monte Carlo rollouts to evaluate the utility of exploring different sectors.",
        "challenges": [
            "Limited battery life constraints.",
            "Communication dropouts requiring decentralized, independent decision-making."
        ],
        "budget": "$10 Million",
        "timeline": "3 Years",
        "outcomes": "Swarm successfully maps complex terrain 5x faster than a single high-altitude drone and adapts if individual drones fail.",
        "application": "Disaster recovery, forest fire monitoring, military reconnaissance.",
        "socialImpact": "Directly saves lives by drastically reducing the time it takes to find missing persons in critical golden hours.",
        "industryPartners": [
            "DJI Enterprise",
            "Various Defense Agencies"
        ]
    },
    {
        "id": "u4cs2",
        "unit": 4,
        "title": "AI in Drug Discovery (Molecular Design)",
        "motivation": "Discovering a new drug takes 10+ years and billions of dollars due to the massive chemical space (10^60 possible molecules).",
        "problemStatement": "Generate novel molecular structures that have a high binding affinity to a target disease protein while being safe and synthesizable.",
        "objectives": [
            "Maximize binding affinity.",
            "Ensure drug-likeness (QED).",
            "Minimize toxicity."
        ],
        "technicalDetails": "State: Current molecular graph or SMILES string. Action: Add atom/bond. Reward: Chemical simulation score (docking score) via Monte Carlo estimates.",
        "methodology": "Monte Carlo Tree Search (MCTS) combined with Graph Neural Networks to explore the chemical space and estimate the final viability of partial molecular structures.",
        "challenges": [
            "Reward function (chemical simulation) is extremely computationally expensive.",
            "Ensuring generated molecules can actually be synthesized in a lab."
        ],
        "budget": "$50+ Million",
        "timeline": "5 Years",
        "outcomes": "Identified viable drug candidates for diseases like fibrosis and antibiotic-resistant bacteria in months rather than years.",
        "application": "Pharmaceuticals, material science, agricultural chemicals.",
        "socialImpact": "Could radically reduce the cost of healthcare and cure currently untreatable diseases.",
        "industryPartners": [
            "Insilico Medicine",
            "DeepMind (AlphaFold integration)"
        ]
    },
    {
        "id": "u4cs3",
        "unit": 4,
        "title": "Personalized Tutoring Systems",
        "motivation": "In a classroom, a teacher cannot adapt the curriculum pace to every single student. One-size-fits-all education leaves many behind.",
        "problemStatement": "Create an intelligent tutoring agent that dynamically selects the next concept or question to maximize a student's long-term retention and mastery.",
        "objectives": [
            "Maximize student test scores.",
            "Minimize dropout/frustration rates.",
            "Discover the optimal sequence of pedagogical concepts."
        ],
        "technicalDetails": "State: Student's past correct/incorrect answers, response time. Action: Select next difficulty level or topic. Reward: Performance on a delayed summative assessment.",
        "methodology": "Modeled as a Partially Observable MDP (POMDP). Used Monte Carlo methods to evaluate expected learning gains from different curricular trajectories.",
        "challenges": [
            "Extremely sparse rewards (tests are infrequent).",
            "High variance in human behavior and learning styles."
        ],
        "budget": "$20 Million",
        "timeline": "4 Years",
        "outcomes": "Students using the RL-based curriculum achieved mastery 30% faster than those on a fixed curriculum track.",
        "application": "EdTech, corporate training, language learning apps.",
        "socialImpact": "Democratizes high-quality, personalized education, adapting to individual cognitive needs globally.",
        "industryPartners": [
            "Duolingo",
            "Carnegie Learning"
        ]
    },
    {
        "id": "u4cs4",
        "unit": 4,
        "title": "Stratospheric Balloon Navigation (Project Loon)",
        "motivation": "Providing internet to remote areas via balloons requires keeping them stationary over a region, but they only control altitude, not direction.",
        "problemStatement": "Navigate a network of high-altitude balloons by autonomously changing altitudes to catch favorable wind currents.",
        "objectives": [
            "Keep balloons over specific GPS coordinates.",
            "Conserve solar battery power.",
            "Avoid hazardous weather."
        ],
        "technicalDetails": "State: Current GPS, altitude, local wind forecasts. Action: Ascend, Descend, Maintain. Reward: Time spent over the target region.",
        "methodology": "Deep Reinforcement Learning trained on historical wind data. Used Monte Carlo rollouts to simulate future wind trajectories and plan multi-day altitude adjustments.",
        "challenges": [
            "Wind forecasts are highly noisy and uncertain.",
            "If a balloon drifts too far, it cannot return."
        ],
        "budget": "$100+ Million",
        "timeline": "7 Years (Project concluded, but AI tech was a massive success)",
        "outcomes": "The RL agent kept balloons over target areas for record-breaking durations (300+ days), outperforming human-designed navigation algorithms.",
        "application": "Aerospace navigation, underwater glider routing, weather balloon control.",
        "socialImpact": "Proved that RL can manage complex, under-actuated systems in chaotic real-world environments to provide global connectivity.",
        "industryPartners": [
            "Google Loon (Alphabet)",
            "SoftBank"
        ]
    }
];
