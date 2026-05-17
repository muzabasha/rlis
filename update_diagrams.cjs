const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, 'src', 'modules');
const units = ['unit1', 'unit2', 'unit3', 'unit4'];

const uniqueDiagrams = {
    // UNIT 1
    "Topic1_EarlyRoots": {
        desc: "Evolution of Trial-and-Error from Biology to Machine Learning.",
        chart: `
graph LR
    A[Animal Psychology] --> C[Law of Effect]
    B[Optimal Control] --> D[Dynamic Programming]
    C --> E(Reinforcement Learning)
    D --> E
    E --> F[Modern AI & Deep RL]
`
    },
    "Topic2_NeedForRL": {
        desc: "Decision making in ambiguous scenarios vs clear labels.",
        chart: `
graph TD
    A[Problem] --> B{Are there labels?}
    B -- Yes --> C[Supervised Learning]
    B -- No --> D{Sequential Decisions?}
    D -- No --> E[Unsupervised Learning]
    D -- Yes --> F[Reinforcement Learning]
    F --> G[Trial & Error Discovery]
`
    },
    "Topic3_RLvsSLvsUL": {
        desc: "Comparing the three main paradigms of Machine Learning.",
        chart: `
graph TD
    A[Machine Learning] --> SL[Supervised]
    A --> UL[Unsupervised]
    A --> RL[Reinforcement]
    SL --> |Labels provided| SL_Out[Predict/Classify]
    UL --> |No labels| UL_Out[Cluster/Structure]
    RL --> |Delayed Rewards| RL_Out[Optimal Policy]
`
    },
    "Topic4_ElementsOfRL": {
        desc: "The fundamental tuple of Reinforcement Learning.",
        chart: `
graph LR
    A((Agent)) -->|Action| E[Environment]
    E -->|Reward| A
    E -->|Next State| A
    style A fill:#c7d2fe,stroke:#4f46e5
    style E fill:#e2e8f0,stroke:#64748b
`
    },
    "Topic5_EnvironmentTypes": {
        desc: "Classification of different environment characteristics.",
        chart: `
graph TD
    E[Environment Properties]
    E --> D[Deterministic vs Stochastic]
    E --> O[Fully vs Partially Observable]
    E --> S[Static vs Dynamic]
    E --> D2[Discrete vs Continuous]
    E --> Ep[Episodic vs Sequential]
`
    },
    "Topic6_WorkingOfRL": {
        desc: "The step-by-step control loop of an RL agent.",
        chart: `
sequenceDiagram
    participant A as Agent
    participant E as Environment
    A->>E: Execute Action (A_t)
    E-->>A: Yield Reward (R_{t+1})
    E-->>A: Transition State (S_{t+1})
    Note over A: Update Knowledge
    Note over A: Select Next Action
`
    },
    "Topic7_ApproachesToRL": {
        desc: "Value-based vs Policy-based approaches.",
        chart: `
graph TD
    RL[RL Approaches] --> V[Value Based]
    RL --> P[Policy Based]
    RL --> AC[Actor-Critic]
    V --> V1[Learn Q-values]
    P --> P1[Learn Probabilities directly]
    AC --> AC1[Combine both]
`
    },
    "Topic8_TypesOfRL": {
        desc: "Model-Free versus Model-Based architectures.",
        chart: `
graph LR
    RL[RL Architectures] --> MB[Model-Based]
    RL --> MF[Model-Free]
    MB --> |Learns Transition Dynamics| Plan[Planning]
    MF --> |Learns purely from experience| React[Direct Policy/Value]
`
    },
    "Topic9_ExplorationExploitation": {
        desc: "The fundamental dilemma of choosing actions.",
        chart: `
graph TD
    D{The Dilemma} --> Exp[Exploration]
    D --> Expl[Exploitation]
    Exp --> |Discover new strategies| Risk[Short-term loss, Long-term gain]
    Expl --> |Use known best action| Safe[Short-term gain, Local optimum]
    Risk -.-> |Updates Knowledge| Expl
`
    },
    "Topic10_AdvantagesOfRL": {
        desc: "Why RL excels in dynamic environments.",
        chart: `
graph TD
    RL[RL Strengths] --> A[No Labels Required]
    RL --> B[Handles Sequential Data]
    RL --> C[Discovers Novel Solutions]
    RL --> D[Adapts to Changing Environments]
`
    },
    "Topic11_ApplicationsOfRL": {
        desc: "Real-world industry applications of RL.",
        chart: `
graph LR
    RL((RL)) --> Games[Game Playing e.g. AlphaGo]
    RL --> Robo[Robotics & Manipulation]
    RL --> Auto[Autonomous Vehicles]
    RL --> Fin[Algorithmic Trading]
    RL --> Med[Personalized Treatment]
`
    },
    "Topic12_ChallengesWithRL": {
        desc: "Technical hurdles in modern RL implementations.",
        chart: `
graph TD
    C[Key Challenges] --> SE[Sample Inefficiency]
    C --> RH[Reward Hacking]
    C --> EE[Exploration vs Exploitation]
    C --> SG[Sim-to-Real Gap]
    SG --> |Fails in real world| Crash[Robotics Failure]
`
    },
    "Topic13_RLvsDLvsML": {
        desc: "Where RL fits in the broader AI landscape.",
        chart: `
graph TD
    AI[Artificial Intelligence] --> ML[Machine Learning]
    ML --> DL[Deep Learning]
    ML --> RL[Reinforcement Learning]
    DL -.-> |Combined| DRL[Deep Reinforcement Learning]
    RL -.-> |Combined| DRL
`
    },

    // UNIT 2
    "Topic1_MDPComponents": {
        desc: "Visualizing the 5 essential components of an MDP.",
        chart: `
graph LR
    S((States S)) -->|Transition P| S_prime((Next State S'))
    A[Actions A] -.->|Triggers| S_prime
    S_prime --> R{Reward R}
    Gamma[Discount Factor &gamma;] -.->|Weights| R
`
    },
    "Topic2_FormalMDPDefinition": {
        desc: "The mathematical boundary between agent and environment.",
        chart: `
graph LR
    subgraph Agent
        Policy[Policy pi]
    end
    subgraph Environment
        P[Transition Function P]
        R[Reward Function R]
    end
    Policy --> |Action a| P
    P --> |Next State s'| Policy
    R --> |Reward r| Policy
`
    },
    "Topic3_MarkovPropertyChain": {
        desc: "The memoryless property explained.",
        chart: `
graph LR
    S_t_minus_1[S_{t-1}] -.-> |Ignored| S_t[S_t]
    S_t --> |Determines entirely| S_t_plus_1[S_{t+1}]
    Note over S_t, S_t_plus_1: P(S_{t+1} | S_t) = P(S_{t+1} | S_1, ..., S_t)
`
    },
    "Topic4_MarkovChainAnalysis": {
        desc: "Analyzing sequence probabilities in a Markov Chain.",
        chart: `
graph TD
    StateA((A)) -->|0.7| StateA
    StateA -->|0.3| StateB((B))
    StateB -->|0.5| StateA
    StateB -->|0.5| StateB
`
    },
    "Topic5_MarkovModel": {
        desc: "Generic Markov Model architecture.",
        chart: `
graph LR
    Init((Start)) --> S1((State 1))
    Init --> S2((State 2))
    S1 -->|prob p| S2
    S2 -->|prob q| S1
`
    },
    "Topic6_MarkovMatrix": {
        desc: "State transition probability matrix.",
        chart: `
graph LR
    P[Transition Matrix P] --> Row1[Row 1: Probabilities from State 1]
    P --> Row2[Row 2: Probabilities from State 2]
    Note over Row1: Sum of probabilities = 1
    Note over Row2: Sum of probabilities = 1
`
    },
    "Topic7_MarkovMatricesInML": {
        desc: "Applying transition matrices in algorithms like PageRank.",
        chart: `
graph TD
    Data[Sequential Data] --> T[Transition Matrix]
    T --> E[Eigenvector Calculation]
    E --> Steady[Steady State Probabilities]
`
    },
    "Topic8_RewardAndReturns": {
        desc: "The concept of cumulative discounted returns.",
        chart: `
graph LR
    R1[R_{t+1}] --> Sum[Return G_t]
    R2[R_{t+2} * &gamma;] --> Sum
    R3[R_{t+3} * &gamma;^2] --> Sum
    R4[... * &gamma;^n] --> Sum
`
    },
    "Topic9_MarkovRewardProcess": {
        desc: "Adding rewards to a standard Markov Chain.",
        chart: `
graph LR
    S1((State 1)) -->|P12| S2((State 2))
    S1 -.->|R1| Reward((+5))
    S2 -.->|R2| Reward2((-1))
`
    },
    "Topic10_StateValueFunction": {
        desc: "Estimating the value of being in a specific state.",
        chart: `
graph TD
    V[V(s)] --> E[Expected Return G_t]
    E --> S_cond[Given S_t = s]
    E --> Pi[Following policy &pi;]
`
    },
    "Topic11_ActionValueFunction": {
        desc: "The Q-value formulation.",
        chart: `
graph TD
    Q[Q(s,a)] --> E[Expected Return G_t]
    E --> Cond[Given S_t = s, A_t = a]
    Cond --> Pi[Following policy &pi; thereafter]
`
    },
    "Topic12_OptimalPolicy": {
        desc: "Defining the best possible policy.",
        chart: `
graph LR
    Pi1[Policy 1] --> V1[V_pi1(s)]
    Pi2[Policy 2] --> V2[V_pi2(s)]
    Pi_star[Policy *] --> V_star[V*(s) >= V_pi(s) for all pi]
    V_star -.-> |Determines| Optimal[Optimal Behavior]
`
    },
    "Topic13_MDPExamples": {
        desc: "Various real-world MDP examples.",
        chart: `
graph TD
    MDP[MDP Framework]
    MDP --> R[Robot Navigation]
    MDP --> I[Inventory Management]
    MDP --> G[Grid World]
    R --> S[States: Coords]
    I --> A[Actions: Order Qty]
`
    },

    // UNIT 3
    "Topic1_PolicyInMDP": {
        desc: "Mapping states to actions via policies.",
        chart: `
graph LR
    S((State Space)) --> Pi{Policy &pi;}
    Pi --> |Determines| A[Action Space]
    A --> |Executes in| E((Environment))
`
    },
    "Topic2_QLearningIntro": {
        desc: "Introduction to Model-Free Temporal Difference learning.",
        chart: `
graph TD
    NoModel[No Transition Model Needed] --> Experience[Learn directly from (S, A, R, S')]
    Experience --> Q[Update Q-table directly]
    Q --> Optimal[Converge to Q*]
`
    },
    "Topic3_DeterministicStochasticPolicy": {
        desc: "Difference between deterministic and stochastic policies.",
        chart: `
graph LR
    S((State s)) --> |Deterministic &pi;(s)| A1[Action a=100%]
    S2((State s)) --> |Stochastic &pi;(a|s)| A2[Action a1=70%]
    S2 --> |Stochastic &pi;(a|s)| A3[Action a2=30%]
`
    },
    "Topic4_BellmanEquationValue": {
        desc: "The recursive Bellman Equation for Value Functions.",
        chart: `
graph TD
    V[V(s)] --> |Equals| Sum[Reward R + &gamma; * V(s')]
    Sum --> |Averaged over| Trans[Transition Probabilities]
    Trans --> NextS[Next States s']
`
    },
    "Topic5_RecyclingRobotCase": {
        desc: "State machine for the Recycling Robot case study.",
        chart: `
stateDiagram-v2
    [*] --> High
    High --> High : Search (prob alpha)
    High --> Low : Search (prob 1-alpha)
    High --> High : Wait
    Low --> Low : Wait
    Low --> High : Recharge
    Low --> Rescue : Search (prob 1-beta)
    Rescue --> High : (Penalty -3)
`
    },
    "Topic6_OptimalPolicyValue": {
        desc: "Bellman Optimality Equations.",
        chart: `
graph TD
    V_star[V*(s)] --> |Max over a| Q_star[Q*(s,a)]
    Q_star --> |R + &gamma; &Sigma; P * V*(s')| Next[Next State Values]
    Next --> V_star
`
    },
    "Topic7_BackupDiagram": {
        desc: "Tree representation of look-ahead backups.",
        chart: `
graph TD
    S((State)) --> |Action| A[Node A]
    A --> |Prob| S1((S'))
    A --> |Prob| S2((S''))
    S1 --> |Reward| R1[R]
    S2 --> |Reward| R2[R]
`
    },
    "Topic8_QLearningOverview": {
        desc: "The macro architecture of the Q-Learning algorithm.",
        chart: `
graph LR
    Init[Initialize Q-table] --> Act[Epsilon-Greedy Action]
    Act --> Env[Environment Step]
    Env --> Observe[Observe R, S']
    Observe --> Update[Bellman Update]
    Update --> Act
`
    },
    "Topic9_QLearningTerms": {
        desc: "Hyperparameters in Q-Learning.",
        chart: `
graph TD
    Params[Q-Learning Hyperparameters]
    Params --> Alpha[Learning Rate &alpha;: How fast to replace old values]
    Params --> Gamma[Discount &gamma;: Importance of future rewards]
    Params --> Epsilon[Exploration &epsilon;: Randomness]
`
    },
    "Topic10_WorkingOfQLearning": {
        desc: "The Off-Policy nature of Q-Learning updates.",
        chart: `
graph TD
    Target[Target = R + &gamma; * max_a Q(S', a)]
    Current[Current = Q(S, A)]
    Error[TD Error = Target - Current]
    Update[Q(S, A) += &alpha; * TD Error]
    Target --> Error
    Current --> Error
    Error --> Update
`
    },
    "Topic11_GamblerDungeon": {
        desc: "State space representation of the Gambler's Problem.",
        chart: `
graph LR
    0((0: Lose)) <-- |Tails| 1((1)) --> |Heads| 2((2))
    2 <-- |Tails| 3((3)) --> |Heads| 4((4))
    3 -.-> 100((100: Win))
`
    },
    "Topic12_QLearningApplications": {
        desc: "Where Q-Learning is used practically.",
        chart: `
graph TD
    QL[Q-Learning] --> Robotics[Path Planning]
    QL --> Comms[Network Routing Optimization]
    QL --> Games[Solving Atari / Discrete Games]
`
    },
    "Topic13_QLearningCaseStudies": {
        desc: "Real-world implementations of Tabular Q-Learning.",
        chart: `
graph LR
    Grid[Gridworld Traversal] --> Train[Agent Training]
    Train --> |Episodes| Converge[Q-Table Convergence]
    Converge --> Deploy[Optimal Path Found]
`
    },

    // UNIT 4
    "Topic1_ISEvolution": {
        desc: "Timeline of Intelligent Systems evolution.",
        chart: `
graph LR
    Logic[Rule-Based Expert Systems] --> Prob[Probabilistic Models]
    Prob --> ML[Machine Learning]
    ML --> RL[Reinforcement Learning]
    RL --> AGI[Towards AGI]
`
    },
    "Topic2_IntelligentBehavior": {
        desc: "What constitutes intelligence in machines.",
        chart: `
graph TD
    IB[Intelligent Behavior]
    IB --> Perceive[Perception]
    IB --> Reason[Reasoning & Planning]
    IB --> Act[Actuation]
    IB --> Learn[Learning from Experience]
`
    },
    "Topic3_TraditionalVsIS": {
        desc: "Static Programming versus Intelligent Systems.",
        chart: `
graph LR
    subgraph Traditional
        Data1[Data] --> Alg[Algorithm]
        Rules1[Rules] --> Alg
        Alg --> Ans1[Answers]
    end
    subgraph Intelligent System
        Data2[Data] --> ML[Machine Learning]
        Ans2[Answers] --> ML
        ML --> Rules2[Rules & Patterns]
    end
`
    },
    "Topic4_ISApplications": {
        desc: "Modern deployments of Intelligent Systems.",
        chart: `
graph TD
    IS[Intelligent Systems] --> NLP[Conversational Agents]
    IS --> CV[Computer Vision Systems]
    IS --> RecSys[Recommender Systems]
    IS --> Control[Autonomous Control]
`
    },
    "Topic5_PEASFramework": {
        desc: "Performance, Environment, Actuators, Sensors framework.",
        chart: `
graph TD
    Task[Task Environment]
    Task --> P[Performance Measure: Goals]
    Task --> E[Environment: Surroundings]
    Task --> A[Actuators: Output mechanisms]
    Task --> S[Sensors: Input data]
`
    },
    "Topic6_AgentTypesReflex": {
        desc: "Simple Reflex Agent Architecture.",
        chart: `
graph TD
    Sen[Sensors] --> State[What the world is like now]
    State --> Rules[Condition-Action Rules]
    Rules --> Action[What action I should do now]
    Action --> Act[Actuators]
`
    },
    "Topic7_EnvironmentTypes": {
        desc: "Detailed environment classification matrix.",
        chart: `
graph LR
    Env[Environment]
    Env --> O[Observability: Full/Partial]
    Env --> A[Agents: Single/Multi]
    Env --> D[Determinism: Deterministic/Stochastic]
`
    },
    "Topic8_AgentTypesDetailed": {
        desc: "Learning Agent Architecture.",
        chart: `
graph TD
    Critic --> |Feedback| Learning[Learning Element]
    Learning --> |Changes| Perf[Performance Element]
    Perf --> |Knowledge| Gen[Problem Generator]
    Gen --> |Exploration| Actuators
`
    },
    "Topic9_EnvironmentsDetailed": {
        desc: "Impact of environment complexity on agent design.",
        chart: `
graph TD
    Simple[Fully Observable, Deterministic] --> Exact[Search Algorithms / A*]
    Complex[Partially Observable, Stochastic] --> Prob[POMDPs & RL]
`
    },
    "Topic10_MCIntro": {
        desc: "Introduction to Monte Carlo methods.",
        chart: `
graph LR
    Start[Start Episode] --> End[Terminal State]
    End --> |Calculate Return G| Update[Update State Values]
    Update --> |Average Returns| Estimate[V(s) or Q(s,a)]
`
    },
    "Topic11_MCBackupDiagrams": {
        desc: "Monte Carlo vs TD Backup Diagrams.",
        chart: `
graph TD
    subgraph Monte Carlo
        S_MC((S)) --> |Entire Episode| R_MC[Final Return G]
    end
    subgraph Temporal Difference
        S_TD((S)) --> |One Step| S_Next((S'))
    end
`
    },
    "Topic12_MCAlgorithms": {
        desc: "First-visit vs Every-visit Monte Carlo.",
        chart: `
graph TD
    State[State S visited]
    State --> Check{First visit in episode?}
    Check -- Yes --> First[First-Visit MC Update]
    Check -- No --> Every[Every-Visit MC Update]
`
    },
    "Topic13_MCPrediction": {
        desc: "Estimating Value Functions using MC.",
        chart: `
graph TD
    Generate[Generate episodes using Policy]
    Generate --> Sum[Sum returns for each state G(s)]
    Sum --> Count[Count visits N(s)]
    Count --> Divide[V(s) = G(s)/N(s)]
`
    },
    "Topic14_MCControl": {
        desc: "Optimizing policies via Monte Carlo Exploring Starts.",
        chart: `
graph TD
    Init[Initialize random Q] --> Generate[Generate Episode with Exploring Starts]
    Generate --> Eval[Policy Evaluation: Q = avg(Returns)]
    Eval --> Impr[Policy Improvement: Greedy]
    Impr --> Generate
`
    },
    "Topic15_EpsilonGreedy": {
        desc: "Soft Policies for guaranteed exploration.",
        chart: `
graph LR
    S[State] --> Choice{Roll Die (0 to 1)}
    Choice -- "< Epsilon" --> Random[Pick Random Action]
    Choice -- "> Epsilon" --> Greedy[Pick Best Action max Q]
    Random --> Execute
    Greedy --> Execute
`
    }
};

units.forEach(unit => {
    const unitDir = path.join(modulesDir, unit);
    if (!fs.existsSync(unitDir)) return;
    const files = fs.readdirSync(unitDir).filter(f => f.endsWith('.tsx'));
    
    files.forEach(file => {
        const filePath = path.join(unitDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        const topicName = file.replace('.tsx', '');
        const data = uniqueDiagrams[topicName] || {
            desc: "Technical flow diagram illustrating the core mechanisms of this topic.",
            chart: `
graph TD
    Start[Start: ${topicName}] --> A[Process Concept]
    A --> End[Apply Knowledge]
`
        };

        const diagramBlock = `
            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="${topicName.replace(/Topic\d+_/, '').replace(/([A-Z])/g, ' $1').trim()} Architecture"
                description="${data.desc}"
                chart={\`${data.chart.trim()}\`}
            />`;

        // Replace existing INTERACTIVE DIAGRAM block
        const regex = /\{\/\*\s*INTERACTIVE DIAGRAM\s*\*\/\}\s*<InteractiveDiagram[\s\S]*?\/>/;
        if (regex.test(content)) {
            content = content.replace(regex, diagramBlock.trim());
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated diagram in ${file}`);
        } else {
            console.log(`No diagram block found in ${file}, maybe skipped earlier.`);
        }
    });
});

console.log("Done updating unique interactive diagrams!");
