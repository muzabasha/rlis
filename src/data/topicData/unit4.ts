import { TopicData } from './index';

export const unit4TopicData: Record<string, TopicData> = {
  Topic1_ISEvolution: {
    prerequisites: [
      'Basic understanding of artificial intelligence concepts',
      'Familiarity with computer science fundamentals',
      'Knowledge of machine learning paradigms',
      'Awareness of AI history and milestones',
      'Understanding of computational thinking'
    ],
    mcqs: [
      {
        id: 't1-1',
        question: 'What distinguishes an intelligent system from a conventional computer program?',
        options: [
          { id: 'a', text: 'It follows pre-programmed instructions without deviation' },
          { id: 'b', text: 'It can adapt its behavior based on experience and environment feedback' },
          { id: 'c', text: 'It always executes faster than traditional programs' },
          { id: 'd', text: 'It requires more memory than conventional programs' }
        ],
        correctAnswer: 'b',
        justification: 'Intelligent systems learn and adapt from experience rather than rigidly following fixed instructions, which is the key differentiator.',
        wrongJustifications: {
          a: 'Following pre-programmed instructions describes conventional programs, not intelligent systems that adapt.',
          c: 'Speed is not the defining characteristic; adaptability and learning are what set intelligent systems apart.',
          d: 'Resource usage is a practical concern, not a defining feature of intelligence.'
        }
      },
      {
        id: 't1-2',
        question: 'During which period did the field of artificial intelligence officially emerge as a discipline?',
        options: [
          { id: 'a', text: '1940s during World War II computing advances' },
          { id: 'b', text: '1956 the Dartmouth Conference' },
          { id: 'c', text: '1969 the first Apollo moon landing' },
          { id: 'd', text: '1980s the rise of expert systems' }
        ],
        correctAnswer: 'b',
        justification: 'The Dartmouth Conference in 1956 is widely recognized as the birth of AI as a formal academic discipline.',
        wrongJustifications: {
          a: 'While wartime computing laid groundwork, AI was not formally established until the Dartmouth Conference.',
          c: 'The moon landing showcased engineering prowess but did not mark AI founding as a field.',
          d: 'Expert systems represent a later phase of AI, not its origin as a discipline.'
        }
      },
      {
        id: 't1-3',
        question: 'What was a primary cause of the first AI winter in the 1970s?',
        options: [
          { id: 'a', text: 'Governments stopped funding all AI research worldwide' },
          { id: 'b', text: 'Early AI systems failed to deliver on overly ambitious promises and expectations' },
          { id: 'c', text: 'Computers became too slow for any AI work' },
          { id: 'd', text: 'AI researchers decided to focus exclusively on robotics' }
        ],
        correctAnswer: 'b',
        justification: 'The first AI winter was triggered when early AI systems (like machine translation and perceptrons) failed to meet inflated expectations, leading to funding cuts.',
        wrongJustifications: {
          a: 'Funding was reduced, not entirely stopped, and this was a consequence of unmet expectations, not an arbitrary decision.',
          c: 'Computing power was limited but not the root cause; the main issue was overpromising and underdelivering.',
          d: 'No such collective shift occurred; the field experienced a period of reduced funding and interest.'
        }
      },
      {
        id: 't1-4',
        question: 'How did the introduction of expert systems in the 1980s impact the evolution of intelligent systems?',
        options: [
          { id: 'a', text: 'They proved that rule-based systems could never solve real problems' },
          { id: 'b', text: 'They demonstrated practical commercial value by encoding human expertise for specific domains' },
          { id: 'c', text: 'They replaced all other forms of AI completely' },
          { id: 'd', text: 'They eliminated the need for machine learning entirely' }
        ],
        correctAnswer: 'b',
        justification: 'Expert systems showed that AI could have real commercial applications by capturing domain-specific knowledge through rules, sparking renewed interest and investment.',
        wrongJustifications: {
          a: 'Expert systems were actually successful in many domains like medical diagnosis and financial planning.',
          c: 'Expert systems were one approach among many; they complemented rather than replaced other AI methods.',
          d: 'Expert systems highlighted the limitations of purely rule-based AI, which later motivated the shift toward machine learning.'
        }
      },
      {
        id: 't1-5',
        question: 'What role did the perceptron controversy in 1969 play in the evolution of intelligent systems?',
        options: [
          { id: 'a', text: 'It immediately led to the development of deep neural networks' },
          { id: 'b', text: 'It exposed limitations of single-layer perceptrons and temporarily dampened neural network research funding' },
          { id: 'c', text: 'It proved that neural networks were always superior to symbolic AI' },
          { id: 'd', text: 'It had no lasting impact on the field of AI' }
        ],
        correctAnswer: 'b',
        justification: 'Minsky and Papert book demonstrated that single-layer perceptrons could not solve XOR-type problems, which significantly reduced funding and interest in neural networks for years.',
        wrongJustifications: {
          a: 'Deep networks emerged decades later after the development of backpropagation and increased computing power.',
          c: 'The book highlighted limitations of perceptrons; symbolic AI remained dominant for many years afterward.',
          d: 'The controversy profoundly influenced AI research directions, redirecting focus away from neural networks for nearly two decades.'
        }
      },
      {
        id: 't1-6',
        question: 'Which paradigm shift characterizes the transition from early AI to modern intelligent systems?',
        options: [
          { id: 'a', text: 'Moving from data-driven learning to hand-crafted rule systems' },
          { id: 'b', text: 'Shifting from static knowledge representation to learning from data and experience' },
          { id: 'c', text: 'Replacing all algorithms with brute-force search methods' },
          { id: 'd', text: 'Abandoning probabilistic methods in favor of deterministic logic' }
        ],
        correctAnswer: 'b',
        justification: 'Modern intelligent systems emphasize learning patterns from data rather than relying solely on manually encoded rules, enabling adaptation to complex environments.',
        wrongJustifications: {
          a: 'The shift was actually the opposite: from hand-crafted rules toward data-driven learning approaches.',
          c: 'Brute-force search is computationally expensive and rarely used in modern intelligent systems.',
          d: 'Probabilistic methods have become more, not less, central to modern AI.'
        }
      },
      {
        id: 't1-7',
        question: 'What is the significance of the Turing Test in the evolution of intelligent systems?',
        options: [
          { id: 'a', text: 'It is a rigorous mathematical proof of machine intelligence' },
          { id: 'b', text: 'It provides a behavioral criterion for machine intelligence indistinguishable from a human' },
          { id: 'c', text: 'It measures the processing speed of an intelligent system' },
          { id: 'd', text: 'It is the only accepted standard for validating AI systems today' }
        ],
        correctAnswer: 'b',
        justification: 'The Turing Test evaluates a machine ability to exhibit human-like conversational behavior, serving as a thought experiment for defining intelligence.',
        wrongJustifications: {
          a: 'The Turing Test is a conceptual benchmark, not a mathematical proof, and has philosophical limitations.',
          c: 'Speed is irrelevant to the Turing Test; it focuses on the quality and believability of responses.',
          d: 'Many modern benchmarks exist (GLUE, Atari games, Go), and the Turing Test has known limitations.'
        }
      },
      {
        id: 't1-8',
        question: 'How did the rise of big data in the 2000s influence the evolution of intelligent systems?',
        options: [
          { id: 'a', text: 'It made rule-based expert systems more practical than ever' },
          { id: 'b', text: 'It enabled data-driven deep learning to achieve breakthrough performance via vast training sets' },
          { id: 'c', text: 'It proved that small datasets are always sufficient for training intelligent systems' },
          { id: 'd', text: 'It reduced the need for computational power in AI research' }
        ],
        correctAnswer: 'b',
        justification: 'The availability of large-scale datasets (images, text, game logs) combined with powerful GPUs enabled deep learning models to achieve unprecedented accuracy.',
        wrongJustifications: {
          a: 'Big data favored learning-based approaches over hand-crafted rule systems.',
          c: 'Deep learning typically requires large datasets; small datasets often lead to overfitting.',
          d: 'Big data increased the need for computational power to process and learn from massive datasets.'
        }
      },
      {
        id: 't1-9',
        question: 'Which best describes the evolution from symbolic AI to connectionist AI?',
        options: [
          { id: 'a', text: 'A shift from representing knowledge as symbols and rules to distributed representations in neural networks' },
          { id: 'b', text: 'A shift from neural networks to logical statements for reasoning' },
          { id: 'c', text: 'A movement away from all forms of computation toward biological neurons' },
          { id: 'd', text: 'Abandoning representation entirely in favor of pure behavior' }
        ],
        correctAnswer: 'a',
        justification: 'Symbolic AI uses explicit symbols and rules for reasoning, while connectionist AI uses distributed, sub-symbolic representations learned by neural networks.',
        wrongJustifications: {
          b: 'This describes the opposite direction: connectionism uses neural networks, symbolic AI uses logical statements.',
          c: 'Connectionist AI is still computational; it is inspired by but not identical to biological neural processing.',
          d: 'Both symbolic and connectionist approaches involve representation; neither abandons it entirely.'
        }
      },
      {
        id: 't1-10',
        question: 'Why is emergence important in the evolution of intelligent systems?',
        options: [
          { id: 'a', text: 'It explains how simple agents following local rules produce complex global behaviors without central control' },
          { id: 'b', text: 'It is a programming technique for writing faster code' },
          { id: 'c', text: 'It refers to the physical emergence of robots from factories' },
          { id: 'd', text: 'It is a method for manually designing every behavior of an intelligent system' }
        ],
        correctAnswer: 'a',
        justification: 'Emergence explains how complex intelligence can arise from simple, decentralized interactions, a principle used in swarm intelligence and multi-agent systems.',
        wrongJustifications: {
          b: 'Emergence is a system-level property, not a programming technique for performance optimization.',
          c: 'The term is used metaphorically to describe how complex patterns arise from simple rules.',
          d: 'Emergence is the opposite of manual design; it describes unplanned, bottom-up complexity.'
        }
      }
    ],
    recap: [
      'Intelligent systems learn and adapt from experience rather than rigidly following fixed instructions.',
      'AI officially emerged as a discipline at the 1956 Dartmouth Conference.',
      'The field experienced AI winters due to overpromising and underdelivering on expectations.',
      'Expert systems in the 1980s demonstrated commercial value by encoding domain-specific knowledge.',
      'The perceptron controversy in 1969 temporarily set back neural network research.',
      'The availability of big data and GPUs in the 2000s enabled the deep learning revolution.',
      'The transition from symbolic AI to connectionist AI represents a shift from explicit rules to learned representations.',
      'Emergence explains how complex intelligent behaviors arise from simple, decentralized interactions.'
    ],
    skillMapping: [
      { skill: 'Historical Perspective of AI', level: 'beginner' },
      { skill: 'Identifying Key AI Milestones', level: 'beginner' },
      { skill: 'Understanding Paradigm Shifts in AI', level: 'intermediate' },
      { skill: 'Differentiating Symbolic vs. Connectionist AI', level: 'intermediate' }
    ]
  },
  Topic2_IntelligentBehavior: {
    prerequisites: [
      'Definition and evolution of intelligent systems',
      'Basic understanding of learning paradigms',
      'Familiarity with decision-making concepts',
      'Knowledge of feedback systems',
      'Understanding of goal-oriented behavior'
    ],
    mcqs: [
      {
        id: 't2-1',
        question: 'Which of the following is a defining characteristic of intelligent behavior?',
        options: [
          { id: 'a', text: 'Performing the same action repeatedly regardless of context' },
          { id: 'b', text: 'Adapting actions based on environmental feedback to achieve goals' },
          { id: 'c', text: 'Executing instructions exactly as programmed' },
          { id: 'd', text: 'Producing random outputs without any pattern' }
        ],
        correctAnswer: 'b',
        justification: 'Intelligent behavior involves adapting actions based on feedback from the environment to achieve specified goals, distinguishing it from rigid, pre-programmed responses.',
        wrongJustifications: {
          a: 'Repeating the same action regardless of context is the opposite of intelligent behavior.',
          c: 'Executing instructions exactly as programmed describes conventional software, not intelligent behavior.',
          d: 'Random outputs without pattern are not intelligent; intelligent behavior is purposeful and goal-directed.'
        }
      },
      {
        id: 't2-2',
        question: 'In the context of intelligent behavior, what does the perception-action cycle refer to?',
        options: [
          { id: 'a', text: 'A closed loop where an agent senses its environment, processes information, and acts upon it' },
          { id: 'b', text: 'A one-time sequence of executing a pre-planned action' },
          { id: 'c', text: 'The physical movement of robotic actuators only' },
          { id: 'd', text: 'A debugging cycle used by AI programmers' }
        ],
        correctAnswer: 'a',
        justification: 'The perception-action cycle describes the continuous loop of sensing the environment, processing information, and taking actions that affect future perceptions.',
        wrongJustifications: {
          b: 'The cycle is continuous and ongoing, not a one-time sequence.',
          c: 'It applies to all intelligent agents (including software agents), not just physical robots.',
          d: 'It is a fundamental concept in agent design, not a programming methodology.'
        }
      },
      {
        id: 't2-3',
        question: 'What distinguishes goal-directed behavior from purely reactive behavior?',
        options: [
          { id: 'a', text: 'Goal-directed behavior considers future consequences, while reactive behavior responds only to immediate stimuli' },
          { id: 'b', text: 'Reactive behavior is always faster' },
          { id: 'c', text: 'Goal-directed behavior ignores sensory input entirely' },
          { id: 'd', text: 'There is no real difference between the two' }
        ],
        correctAnswer: 'a',
        justification: 'Goal-directed agents consider how current actions affect progress toward future goals, whereas reactive agents respond only to the current percept.',
        wrongJustifications: {
          b: 'Speed is not the defining difference; the key distinction is consideration of future consequences.',
          c: 'Goal-directed agents still require sensory input to evaluate progress toward their goals.',
          d: 'They differ fundamentally in whether actions are chosen based on immediate stimuli or long-term goals.'
        }
      },
      {
        id: 't2-4',
        question: 'Which property of intelligent behavior enables an agent to handle novel situations?',
        options: [
          { id: 'a', text: 'Generalization applying learned patterns to new unseen scenarios' },
          { id: 'b', text: 'Memorization storing every possible input-output pair' },
          { id: 'c', text: 'Randomization trying random actions until something works' },
          { id: 'd', text: 'Specialization focusing only on one specific task' }
        ],
        correctAnswer: 'a',
        justification: 'Generalization allows an intelligent agent to leverage past learning to make reasonable decisions in novel situations, a key aspect of intelligence.',
        wrongJustifications: {
          b: 'Memorizing every possible scenario is impractical for complex environments.',
          c: 'Pure randomization without learning is inefficient and not a hallmark of intelligent behavior.',
          d: 'Specialization helps with specific tasks but does not help handle novel situations outside that domain.'
        }
      },
      {
        id: 't2-5',
        question: 'How does exploration contribute to intelligent behavior in reinforcement learning agents?',
        options: [
          { id: 'a', text: 'It guarantees immediate maximum reward in every situation' },
          { id: 'b', text: 'It allows the agent to discover potentially better actions not apparent from current knowledge' },
          { id: 'c', text: 'It eliminates the need for any learning algorithm' },
          { id: 'd', text: 'It prevents the agent from ever exploiting known good actions' }
        ],
        correctAnswer: 'b',
        justification: 'Exploration enables the agent to try non-optimal actions to gather information, potentially discovering higher-reward strategies that exploitation alone would miss.',
        wrongJustifications: {
          a: 'Exploration often involves sacrificing immediate reward to gain information.',
          c: 'Exploration is a component of learning, not a replacement for the learning algorithm.',
          d: 'Intelligent agents balance exploration with exploitation.'
        }
      },
      {
        id: 't2-6',
        question: 'What role does memory play in exhibiting intelligent behavior?',
        options: [
          { id: 'a', text: 'Memory is irrelevant because intelligence is only about processing current input' },
          { id: 'b', text: 'Memory enables agents to use past experiences to inform current and future decisions' },
          { id: 'c', text: 'Memory only stores the final learned policy, not intermediate experiences' },
          { id: 'd', text: 'Memory degrades intelligence by introducing bias' }
        ],
        correctAnswer: 'b',
        justification: 'Memory allows agents to retain and leverage past experiences, which is crucial for learning, planning, and improving future decisions.',
        wrongJustifications: {
          a: 'Memory is critical for learning from experience; current input alone is insufficient.',
          c: 'Many algorithms store and replay past experiences for more efficient learning.',
          d: 'While bias can be a concern, memory is essential for learning.'
        }
      },
      {
        id: 't2-7',
        question: 'Which of the following best illustrates autonomous intelligent behavior?',
        options: [
          { id: 'a', text: 'A calculator performing arithmetic operations when buttons are pressed' },
          { id: 'b', text: 'A self-driving car navigating a busy intersection without human intervention' },
          { id: 'c', text: 'A light switch turning on when flipped' },
          { id: 'd', text: 'A compiler translating source code to machine code' }
        ],
        correctAnswer: 'b',
        justification: 'A self-driving car demonstrates autonomy by perceiving its environment, making complex decisions, and acting without direct human control in dynamic conditions.',
        wrongJustifications: {
          a: 'A calculator performs deterministic, pre-programmed operations without autonomous decision-making.',
          c: 'A light switch is a simple mechanical device with no perception or decision-making capability.',
          d: 'A compiler follows fixed translation rules and does not adapt or learn.'
        }
      },
      {
        id: 't2-8',
        question: 'Why is robustness considered a key characteristic of intelligent behavior?',
        options: [
          { id: 'a', text: 'It describes the physical strength of robotic hardware' },
          { id: 'b', text: 'It refers to maintaining acceptable performance despite noise uncertainty or partial failures' },
          { id: 'c', text: 'It means the system never makes any mistakes' },
          { id: 'd', text: 'It requires the system to double all computations for safety' }
        ],
        correctAnswer: 'b',
        justification: 'Robustness allows intelligent systems to function effectively even when faced with noisy sensory input, unexpected changes, or component degradation.',
        wrongJustifications: {
          a: 'Robustness in AI refers to resilience of behavior, not physical hardware strength.',
          c: 'No system is infallible; robustness means graceful degradation, not perfection.',
          d: 'Redundancy may support robustness, but robustness is about maintaining performance despite challenges.'
        }
      },
      {
        id: 't2-9',
        question: 'How does curiosity relate to intelligent behavior in artificial agents?',
        options: [
          { id: 'a', text: 'Curiosity is a human trait that cannot be modeled computationally' },
          { id: 'b', text: 'Curiosity-driven exploration encourages agents to seek novelty improving long-term learning' },
          { id: 'c', text: 'Curiosity always interferes with goal achievement' },
          { id: 'd', text: 'Curiosity is irrelevant in artificial intelligence research' }
        ],
        correctAnswer: 'b',
        justification: 'Curiosity in AI is modeled as intrinsic motivation driving agents to explore novel states, leading to more robust learning and better long-term performance.',
        wrongJustifications: {
          a: 'Curiosity has been successfully modeled in AI using intrinsic reward signals.',
          c: 'Curiosity improves learning efficiency in sparse-reward environments when balanced with goals.',
          d: 'Curiosity-driven exploration is an active area of AI research with practical applications.'
        }
      },
      {
        id: 't2-10',
        question: 'What is the relationship between intelligence and the ability to predict future states?',
        options: [
          { id: 'a', text: 'Prediction is unrelated to intelligence' },
          { id: 'b', text: 'The ability to predict future states enables proactive rather than merely reactive behavior' },
          { id: 'c', text: 'Prediction requires supernatural abilities beyond computational systems' },
          { id: 'd', text: 'Only humans can predict while AI agents can only react' }
        ],
        correctAnswer: 'b',
        justification: 'Predictive capability allows agents to anticipate future events and plan actions proactively, a hallmark of advanced intelligence.',
        wrongJustifications: {
          a: 'Prediction is fundamental to intelligence; even simple animals predict outcomes of actions.',
          c: 'Prediction in AI is achieved through learned models of the environment.',
          d: 'Many AI systems successfully predict future states.'
        }
      }
    ],
    recap: [
      'Intelligent behavior involves adapting actions based on environmental feedback to achieve goals.',
      'The perception-action cycle forms the continuous loop central to agent-environment interaction.',
      'Goal-directed behavior considers future consequences, unlike purely reactive responses.',
      'Generalization allows agents to handle novel situations by applying learned patterns.',
      'Exploration is essential for discovering better strategies beyond current knowledge.',
      'Memory enables agents to leverage past experiences for improved decision-making.',
      'Robustness allows intelligent systems to maintain performance despite noise and uncertainty.',
      'Predictive capability enables proactive behavior and distinguishes advanced intelligence.'
    ],
    skillMapping: [
      { skill: 'Identifying Characteristics of Intelligent Behavior', level: 'beginner' },
      { skill: 'Understanding the Perception-Action Cycle', level: 'beginner' },
      { skill: 'Differentiating Reactive vs. Goal-Directed Behavior', level: 'intermediate' },
      { skill: 'Analyzing Autonomy and Robustness in Agents', level: 'intermediate' },
      { skill: 'Applying Curiosity-Driven Exploration Concepts', level: 'advanced' }
    ]
  },
  Topic3_TraditionalVsIS: {
    prerequisites: [
      'Characteristics of intelligent behavior',
      'Understanding of conventional programming',
      'Basic knowledge of algorithm design',
      'Familiarity with rule-based systems',
      'Concept of data-driven decision making'
    ],
    mcqs: [
      {
        id: 't3-1',
        question: 'What is the fundamental difference between traditional and intelligent systems in decision-making?',
        options: [
          { id: 'a', text: 'Traditional systems decide based on pre-defined rules; intelligent systems learn patterns from data' },
          { id: 'b', text: 'Traditional systems are always faster than intelligent systems' },
          { id: 'c', text: 'Intelligent systems do not make decisions; they only provide recommendations' },
          { id: 'd', text: 'There is no difference; all systems work identically' }
        ],
        correctAnswer: 'a',
        justification: 'Traditional systems follow explicitly programmed if-then rules, while intelligent systems infer decision patterns from data through learning algorithms.',
        wrongJustifications: {
          b: 'Speed depends on implementation, not on the paradigm.',
          c: 'Intelligent systems can make autonomous decisions, such as controlling robots.',
          d: 'The fundamental distinction lies in rule-based vs. learning-based approaches.'
        }
      },
      {
        id: 't3-2',
        question: 'How do traditional systems handle previously unseen inputs compared to intelligent systems?',
        options: [
          { id: 'a', text: 'Both handle unseen inputs equally well by default' },
          { id: 'b', text: 'Traditional systems typically fail or produce errors; intelligent systems may generalize from learned patterns' },
          { id: 'c', text: 'Traditional systems learn from unseen inputs instantly' },
          { id: 'd', text: 'Intelligent systems cannot handle any input they were not explicitly trained on' }
        ],
        correctAnswer: 'b',
        justification: 'Traditional systems rely on exhaustive rule coverage and often fail on edge cases, while intelligent systems generalize from training to handle novel inputs.',
        wrongJustifications: {
          a: 'Traditional systems require explicit rules for every scenario.',
          c: 'Traditional systems cannot learn; they only execute pre-programmed logic.',
          d: 'Generalization is a key advantage of intelligent systems.'
        }
      },
      {
        id: 't3-3',
        question: 'When would a traditional rule-based system be preferred over an intelligent learning system?',
        options: [
          { id: 'a', text: 'When recognizing complex patterns in unstructured data like images' },
          { id: 'b', text: 'When the domain has well-defined stable rules and interpretability is critical' },
          { id: 'c', text: 'When the environment is highly dynamic and unpredictable' },
          { id: 'd', text: 'When massive amounts of training data are available' }
        ],
        correctAnswer: 'b',
        justification: 'Rule-based systems excel when domain rules are clear, stable, and require auditable decision-making (e.g., tax calculations, compliance checks).',
        wrongJustifications: {
          a: 'Complex pattern recognition favors learning-based intelligent systems.',
          c: 'Highly dynamic environments favor adaptive intelligent systems.',
          d: 'Abundant training data would be leveraged by a learning system.'
        }
      },
      {
        id: 't3-4',
        question: 'How do traditional and intelligent systems differ in handling uncertainty?',
        options: [
          { id: 'a', text: 'Traditional systems handle uncertainty through probabilistic algorithms; intelligent systems ignore it' },
          { id: 'b', text: 'Traditional systems typically require precise inputs; intelligent systems handle noisy or incomplete data' },
          { id: 'c', text: 'Both handle uncertainty in exactly the same way' },
          { id: 'd', text: 'Neither type of system can handle any form of uncertainty' }
        ],
        correctAnswer: 'b',
        justification: 'Traditional systems often expect exact inputs and may fail with noisy data, whereas intelligent systems reason under uncertainty.',
        wrongJustifications: {
          a: 'Intelligent systems are designed to model and handle uncertainty.',
          c: 'They differ fundamentally in handling uncertainty.',
          d: 'Intelligent systems explicitly model uncertainty.'
        }
      },
      {
        id: 't3-5',
        question: 'What is a key limitation of traditional systems that intelligent systems overcome?',
        options: [
          { id: 'a', text: 'Traditional systems consume too little electricity' },
          { id: 'b', text: 'Traditional systems cannot adapt their behavior when the environment changes' },
          { id: 'c', text: 'Traditional systems always produce incorrect results' },
          { id: 'd', text: 'Traditional systems are too difficult to program initially' }
        ],
        correctAnswer: 'b',
        justification: 'Traditional systems follow fixed rules and cannot adapt to changing conditions without manual reprogramming, whereas intelligent systems adapt through learning.',
        wrongJustifications: {
          a: 'Power consumption is not the core issue; lack of adaptability is.',
          c: 'Traditional systems can be correct within their defined scope.',
          d: 'Traditional systems are often easier to program initially.'
        }
      },
      {
        id: 't3-6',
        question: 'Which statement best compares the development effort for traditional vs. intelligent systems?',
        options: [
          { id: 'a', text: 'Traditional systems require more data; intelligent systems require more rule engineering' },
          { id: 'b', text: 'Traditional systems require explicit rule engineering; intelligent systems require data preparation and model design' },
          { id: 'c', text: 'Both require identical development processes' },
          { id: 'd', text: 'Intelligent systems do not require any human effort to develop' }
        ],
        correctAnswer: 'b',
        justification: 'Traditional systems rely on domain experts to codify rules, while intelligent systems shift effort toward data collection, cleaning, and model architecture design.',
        wrongJustifications: {
          a: 'This reverses the actual effort allocation.',
          c: 'The development processes are fundamentally different.',
          d: 'Intelligent systems require significant human effort in data preparation and tuning.'
        }
      },
      {
        id: 't3-7',
        question: 'How does the maintainability of traditional systems compare to intelligent systems?',
        options: [
          { id: 'a', text: 'Traditional systems are easier to update when rules change; intelligent systems may need retraining' },
          { id: 'b', text: 'Intelligent systems never need maintenance once deployed' },
          { id: 'c', text: 'Traditional systems require complete rewrites for any change' },
          { id: 'd', text: 'Both require identical maintenance procedures' }
        ],
        correctAnswer: 'a',
        justification: 'Updating a rule in a traditional system is often straightforward, while intelligent systems may require collecting new data and retraining.',
        wrongJustifications: {
          b: 'Intelligent systems require monitoring and periodic retraining.',
          c: 'Traditional systems can be updated by modifying specific rules.',
          d: 'Maintenance differs significantly: rule editing vs. data collection and retraining.'
        }
      },
      {
        id: 't3-8',
        question: 'What advantage do intelligent systems have over traditional systems in scalability to complex problems?',
        options: [
          { id: 'a', text: 'They can automatically discover patterns in high-dimensional data impractical to encode as rules' },
          { id: 'b', text: 'Traditional systems scale better because rules are always simpler' },
          { id: 'c', text: 'Intelligent systems cannot scale at all beyond toy problems' },
          { id: 'd', text: 'Scalability depends only on hardware, not on the system type' }
        ],
        correctAnswer: 'a',
        justification: 'For problems like image recognition, the number of rules required would be astronomical, whereas learning systems discover relevant patterns automatically.',
        wrongJustifications: {
          b: 'Complex problems require exponentially many rules, making traditional approaches unscalable.',
          c: 'Intelligent systems scale to extremely complex problems like Go and protein folding.',
          d: 'While hardware matters, the algorithmic approach fundamentally determines scalability.'
        }
      },
      {
        id: 't3-9',
        question: 'In terms of explainability, which statement is most accurate?',
        options: [
          { id: 'a', text: 'Traditional systems are inherently explainable since their decision logic is explicitly programmed' },
          { id: 'b', text: 'Intelligent systems are always more explainable than traditional systems' },
          { id: 'c', text: 'Both are equally difficult to explain' },
          { id: 'd', text: 'Explainability is not important for either type of system' }
        ],
        correctAnswer: 'a',
        justification: 'Rule-based systems have transparent decision paths, while intelligent systems often operate as black boxes, though explainable AI is an active research area.',
        wrongJustifications: {
          b: 'Deep learning models are often less explainable than rule-based systems.',
          c: 'Traditional systems are generally more transparent.',
          d: 'Explainability is crucial in healthcare, finance, and autonomous systems.'
        }
      },
      {
        id: 't3-10',
        question: 'When would a hybrid approach combining traditional and intelligent systems be beneficial?',
        options: [
          { id: 'a', text: 'Using a rule-based guardrails layer to constrain a learning-based system within safe boundaries' },
          { id: 'b', text: 'Replacing all intelligent components with if-then statements' },
          { id: 'c', text: 'Using only neural networks without any safety constraints' },
          { id: 'd', text: 'Ignoring domain expertise entirely when designing the system' }
        ],
        correctAnswer: 'a',
        justification: 'Hybrid systems combine the adaptability of learning approaches with the safety and interpretability of rule-based constraints, as in autonomous vehicle safety layers.',
        wrongJustifications: {
          b: 'Purely rule-based approaches lose adaptability and pattern-recognition capabilities.',
          c: 'Pure learning systems may exhibit unsafe behaviors in edge cases.',
          d: 'Domain expertise is valuable for designing effective hybrid systems.'
        }
      }
    ],
    recap: [
      'Traditional systems make decisions via pre-defined rules; intelligent systems learn patterns from data.',
      'Traditional systems fail on unseen inputs; intelligent systems generalize from learned patterns.',
      'Rule-based systems are preferred when domain rules are stable and interpretability is critical.',
      'Intelligent systems handle noisy and incomplete data better than traditional systems.',
      'Traditional systems cannot adapt to environmental changes without manual reprogramming.',
      'Development effort shifts from rule engineering to data preparation for intelligent systems.',
      'Intelligent systems scale to complex, high-dimensional problems where rules become impractical.',
      'Hybrid approaches combine the adaptability of learning with the safety of rule-based constraints.'
    ],
    skillMapping: [
      { skill: 'Differentiating Traditional vs. Intelligent Systems', level: 'beginner' },
      { skill: 'Evaluating When to Use Rule-Based vs. Learning Approaches', level: 'intermediate' },
      { skill: 'Assessing Trade-offs in Explainability and Adaptability', level: 'intermediate' },
      { skill: 'Designing Hybrid System Architectures', level: 'advanced' }
    ]
  },
  Topic4_ISApplications: {
    prerequisites: [
      'Understanding of intelligent systems concepts',
      'Familiarity with real-world AI deployments',
      'Basic knowledge of various industry domains',
      'Concept of problem-solution mapping',
      'Awareness of AI ethics and limitations'
    ],
    mcqs: [
      {
        id: 't4-1',
        question: 'How are intelligent systems applied in healthcare diagnostics?',
        options: [
          { id: 'a', text: 'They replace doctors entirely in all medical decisions' },
          { id: 'b', text: 'They assist by analyzing medical images and patient data to identify disease patterns' },
          { id: 'c', text: 'They only handle administrative tasks like billing' },
          { id: 'd', text: 'They are not used in healthcare due to privacy concerns' }
        ],
        correctAnswer: 'b',
        justification: 'Intelligent systems in healthcare analyze medical images, patient records, and genomic data to assist clinicians in detecting diseases earlier and more accurately.',
        wrongJustifications: {
          a: 'AI augments rather than replaces human medical professionals.',
          c: 'While AI can assist with administration, its major impact is in clinical decision support.',
          d: 'Intelligent systems are widely used in healthcare with privacy safeguards.'
        }
      },
      {
        id: 't4-2',
        question: 'What role do intelligent systems play in autonomous vehicles?',
        options: [
          { id: 'a', text: 'They only play music and navigate using GPS maps' },
          { id: 'b', text: 'They perceive the environment, plan paths, and control vehicle actuators to navigate safely' },
          { id: 'c', text: 'They are limited to theoretical research and not deployed in real vehicles' },
          { id: 'd', text: 'They operate without sensors relying only on pre-loaded maps' }
        ],
        correctAnswer: 'b',
        justification: 'Autonomous vehicles use intelligent systems for perception, planning, and control to navigate safely.',
        wrongJustifications: {
          a: 'Navigation is a minor function; the core role is perception, planning, and control.',
          c: 'Autonomous vehicles are actively deployed in multiple cities.',
          d: 'Sensors are essential for perception; pre-loaded maps alone are insufficient.'
        }
      },
      {
        id: 't4-3',
        question: 'How are intelligent systems transforming the financial services industry?',
        options: [
          { id: 'a', text: 'They only automate simple arithmetic calculations' },
          { id: 'b', text: 'They power fraud detection, algorithmic trading, credit risk assessment, and personalized advice' },
          { id: 'c', text: 'They have no applications in finance due to regulatory barriers' },
          { id: 'd', text: 'They exclusively replace all human financial advisors' }
        ],
        correctAnswer: 'b',
        justification: 'Financial institutions use intelligent systems for fraud detection, automated trading, credit scoring, and robo-advisors.',
        wrongJustifications: {
          a: 'Intelligent systems handle sophisticated tasks beyond arithmetic.',
          c: 'Despite regulations, AI is widely deployed in finance with compliance frameworks.',
          d: 'AI augments advisors; full replacement is not the reality.'
        }
      },
      {
        id: 't4-4',
        question: 'In manufacturing, how do intelligent systems contribute to predictive maintenance?',
        options: [
          { id: 'a', text: 'They replace all machinery with newer models' },
          { id: 'b', text: 'They analyze sensor data to predict equipment failures before they occur reducing downtime' },
          { id: 'c', text: 'They manually inspect each machine part once a month' },
          { id: 'd', text: 'They only track inventory levels for spare parts' }
        ],
        correctAnswer: 'b',
        justification: 'Predictive maintenance uses sensor data and ML models to forecast failures, enabling proactive repairs and minimizing unplanned downtime.',
        wrongJustifications: {
          a: 'The goal is to maintain existing equipment better, not replace it.',
          c: 'Automated analysis improves upon manual inspection.',
          d: 'Predictive maintenance focuses on equipment health forecasting.'
        }
      },
      {
        id: 't4-5',
        question: 'Which NLP application of intelligent systems has been most impactful?',
        options: [
          { id: 'a', text: 'Spell checking in word processors' },
          { id: 'b', text: 'Machine translation, sentiment analysis, and conversational AI assistants' },
          { id: 'c', text: 'Counting words in documents' },
          { id: 'd', text: 'Printing documents to PDF' }
        ],
        correctAnswer: 'b',
        justification: 'Modern NLP leverages deep learning for translation, sentiment analysis, and conversational AI with human-like fluency.',
        wrongJustifications: {
          a: 'Spell checking predates modern intelligent systems.',
          c: 'Word counting is trivial and does not require intelligent systems.',
          d: 'Printing to PDF is a standard OS function.'
        }
      },
      {
        id: 't4-6',
        question: 'How are intelligent systems applied in the energy sector?',
        options: [
          { id: 'a', text: 'They only send monthly electricity bills to customers' },
          { id: 'b', text: 'They optimize smart grid operations, predict demand, and manage renewable energy' },
          { id: 'c', text: 'The energy sector does not use any intelligent systems' },
          { id: 'd', text: 'They exclusively control nuclear power plants autonomously' }
        ],
        correctAnswer: 'b',
        justification: 'Intelligent systems optimize energy distribution, forecast demand, and manage intermittent renewable sources.',
        wrongJustifications: {
          a: 'The real impact is on grid optimization and energy management.',
          c: 'The energy sector increasingly adopts AI.',
          d: 'Nuclear plants retain extensive human oversight.'
        }
      },
      {
        id: 't4-7',
        question: 'What is the primary application of intelligent systems in e-commerce?',
        options: [
          { id: 'a', text: 'They only display product images on websites' },
          { id: 'b', text: 'They power recommendation systems, demand forecasting, and dynamic pricing' },
          { id: 'c', text: 'They have no applications in retail' },
          { id: 'd', text: 'They manually pack and ship all orders' }
        ],
        correctAnswer: 'b',
        justification: 'E-commerce platforms use AI for personalized recommendations, inventory forecasting, and dynamic pricing.',
        wrongJustifications: {
          a: 'AI personalizes what each customer sees.',
          c: 'AI is extensively used in retail.',
          d: 'Recommendation and pricing are the AI applications.'
        }
      },
      {
        id: 't4-8',
        question: 'How do intelligent systems contribute to cybersecurity?',
        options: [
          { id: 'a', text: 'They only create stronger passwords for users' },
          { id: 'b', text: 'They detect anomalies, identify malware patterns, and respond to threats in real-time' },
          { id: 'c', text: 'They eliminate all cybersecurity threats completely' },
          { id: 'd', text: 'They are not used in cybersecurity because AI can be hacked' }
        ],
        correctAnswer: 'b',
        justification: 'Intelligent systems analyze network traffic to detect anomalies, recognize malware, and automate incident response.',
        wrongJustifications: {
          a: 'The main contribution is threat detection and response.',
          c: 'No system can eliminate all threats.',
          d: 'AI is widely adopted in cybersecurity.'
        }
      },
      {
        id: 't4-9',
        question: 'Which factor is most critical when deploying intelligent systems in safety-critical applications?',
        options: [
          { id: 'a', text: 'Making the system as creative as possible' },
          { id: 'b', text: 'Ensuring reliability, robustness, and fail-safe mechanisms' },
          { id: 'c', text: 'Minimizing the file size of the software' },
          { id: 'd', text: 'Using the newest programming language' }
        ],
        correctAnswer: 'b',
        justification: 'Safety-critical applications require rigorous validation, redundant fail-safes, and reliable performance under all conditions.',
        wrongJustifications: {
          a: 'Predictability and safety are paramount in critical systems.',
          c: 'File size is cosmetic compared to reliability.',
          d: 'Rigorous testing matters more than language choice.'
        }
      },
      {
        id: 't4-10',
        question: 'How are intelligent systems used in agriculture?',
        options: [
          { id: 'a', text: 'They only keep records of farm equipment inventory' },
          { id: 'b', text: 'They enable precision farming through crop monitoring, yield prediction, and automated irrigation' },
          { id: 'c', text: 'Agriculture cannot benefit from intelligent systems due to field variability' },
          { id: 'd', text: 'They replace all human farmers with fully autonomous robots' }
        ],
        correctAnswer: 'b',
        justification: 'Precision agriculture uses drone imagery, soil sensors, and ML for crop monitoring, yield prediction, and resource optimization.',
        wrongJustifications: {
          a: 'The major impact is on crop monitoring and optimization.',
          c: 'AI specifically addresses field variability.',
          d: 'AI augments farmers; full autonomy is a long-term goal.'
        }
      }
    ],
    recap: [
      'Healthcare: AI assists in diagnostic imaging, patient data analysis, and clinical decision support.',
      'Autonomous vehicles: Intelligent systems handle perception, planning, and control.',
      'Finance: AI powers fraud detection, algorithmic trading, and personalized advice.',
      'Manufacturing: Predictive maintenance uses sensor data to forecast equipment failures.',
      'NLP: Machine translation, sentiment analysis, and conversational AI transform HCI.',
      'Energy: Smart grid optimization, demand forecasting, and renewable integration.',
      'E-commerce: Recommendation systems, demand forecasting, and dynamic pricing.',
      'Cybersecurity: Anomaly detection, malware identification, and automated threat response.'
    ],
    skillMapping: [
      { skill: 'Identifying Real-World AI Applications', level: 'beginner' },
      { skill: 'Mapping AI Techniques to Industry Problems', level: 'intermediate' },
      { skill: 'Evaluating Safety Considerations in AI Deployments', level: 'intermediate' },
      { skill: 'Analyzing the Impact of AI Across Domains', level: 'intermediate' }
    ]
  },
  Topic5_PEASFramework: {
    prerequisites: [
      'Understanding of intelligent agents',
      'Basic knowledge of environment interaction',
      'Familiarity with performance metrics',
      'Concept of sensors and actuators',
      'Goal-oriented behavior understanding'
    ],
    mcqs: [
      {
        id: 't5-1',
        question: 'What does PEAS stand for in the context of intelligent agent design?',
        options: [
          { id: 'a', text: 'Performance, Environment, Actuators, Sensors' },
          { id: 'b', text: 'Planning, Execution, Analysis, Synthesis' },
          { id: 'c', text: 'Perception, Evaluation, Action, Selection' },
          { id: 'd', text: 'Prediction, Estimation, Adaptation, Simulation' }
        ],
        correctAnswer: 'a',
        justification: 'PEAS stands for Performance measure, Environment, Actuators, and Sensors, the four components for specifying an intelligent agent design.',
        wrongJustifications: {
          b: 'These are generic process terms, not the PEAS components.',
          c: 'While related to agent function, this is not the correct PEAS expansion.',
          d: 'These terms describe aspects of learning, not the PEAS framework.'
        }
      },
      {
        id: 't5-2',
        question: 'In the PEAS framework for a self-driving taxi, what represents the Performance measure?',
        options: [
          { id: 'a', text: 'The cars cameras and LiDAR sensors' },
          { id: 'b', text: 'Safety, time efficiency, passenger comfort, and legal compliance' },
          { id: 'c', text: 'The steering wheel, brakes, and accelerator' },
          { id: 'd', text: 'The road infrastructure and traffic conditions' }
        ],
        correctAnswer: 'b',
        justification: 'The Performance measure defines successful behavior: safety, efficiency, comfort, and legal compliance for a taxi.',
        wrongJustifications: {
          a: 'Cameras and LiDAR are Sensors.',
          c: 'Steering, brakes, and accelerator are Actuators.',
          d: 'Roads and traffic are part of the Environment.'
        }
      },
      {
        id: 't5-3',
        question: 'How does the Environment component in PEAS influence agent design?',
        options: [
          { id: 'a', text: 'The environment determines what sensors and actuators the agent needs' },
          { id: 'b', text: 'The environment only affects the agents color scheme' },
          { id: 'c', text: 'The environment is irrelevant to agent design' },
          { id: 'd', text: 'The environment only determines the agents name' }
        ],
        correctAnswer: 'a',
        justification: 'Environment properties (accessible, deterministic, etc.) directly dictate required sensor capabilities and available actions.',
        wrongJustifications: {
          b: 'The environment fundamentally shapes architecture, not aesthetics.',
          c: 'The environment is central to agent design.',
          d: 'The environment determines functional requirements.'
        }
      },
      {
        id: 't5-4',
        question: 'In PEAS, what distinguishes actuators from sensors?',
        options: [
          { id: 'a', text: 'Sensors affect the environment; actuators receive percepts' },
          { id: 'b', text: 'Sensors receive input from the environment; actuators perform actions that affect the environment' },
          { id: 'c', text: 'There is no difference between sensors and actuators' },
          { id: 'd', text: 'Both sensors and actuators only store data for later analysis' }
        ],
        correctAnswer: 'b',
        justification: 'Sensors are input devices for perceiving the environment; actuators are output mechanisms for acting upon it.',
        wrongJustifications: {
          a: 'This reverses the roles.',
          c: 'Sensors and actuators serve opposite functions.',
          d: 'Sensors capture real-time data; actuators execute actions.'
        }
      },
      {
        id: 't5-5',
        question: 'Why is defining the Performance measure the first step in the PEAS framework?',
        options: [
          { id: 'a', text: 'Because it is the easiest component to define' },
          { id: 'b', text: 'Because the performance measure determines what constitutes success and guides all subsequent design choices' },
          { id: 'c', text: 'Because performance measures are standardized across all applications' },
          { id: 'd', text: 'Because it is the only component that matters' }
        ],
        correctAnswer: 'b',
        justification: 'The performance measure defines the objective; all design decisions about sensors, actuators, and environment follow from what the agent should optimize.',
        wrongJustifications: {
          a: 'Defining a good performance measure is often challenging.',
          c: 'Performance measures are highly application-specific.',
          d: 'All four PEAS components are important.'
        }
      },
      {
        id: 't5-6',
        question: 'For a medical diagnosis agent, which applies PEAS correctly?',
        options: [
          { id: 'a', text: 'Performance: minimize diagnosis errors; Environment: patient health records; Actuators: display/screen; Sensors: database queries' },
          { id: 'b', text: 'Performance: maximize screen brightness; Environment: hospital cafeteria; Actuators: coffee machine; Sensors: thermometer' },
          { id: 'c', text: 'Performance: internet speed; Environment: weather forecast; Actuators: robotic arm; Sensors: camera' },
          { id: 'd', text: 'Performance: file storage; Environment: cloud server; Actuators: printer; Sensors: microphone' }
        ],
        correctAnswer: 'a',
        justification: 'For medical diagnosis, success is accurate diagnoses, based on patient data, with results via display, accessing databases.',
        wrongJustifications: {
          b: 'Screen brightness and cafeteria are not relevant to diagnosis.',
          c: 'Internet speed and weather are not relevant.',
          d: 'File storage and printers are not the primary focus.'
        }
      },
      {
        id: 't5-7',
        question: 'What happens if PEAS components are incorrectly specified?',
        options: [
          { id: 'a', text: 'The agent may optimize for wrong objectives or use inappropriate sensors/actuators' },
          { id: 'b', text: 'The agent automatically corrects any specification errors' },
          { id: 'c', text: 'Incorrect specification has no effect on agent behavior' },
          { id: 'd', text: 'The agent refuses to run until specification is perfect' }
        ],
        correctAnswer: 'a',
        justification: 'Incorrect PEAS specification leads to misaligned agent behavior, such as optimizing proxy metrics that do not reflect true goals.',
        wrongJustifications: {
          b: 'Agents cannot self-correct specification errors.',
          c: 'Specification errors directly affect behavior.',
          d: 'Agents run with whatever specification they are given.'
        }
      },
      {
        id: 't5-8',
        question: 'How does PEAS help in comparing different agent designs?',
        options: [
          { id: 'a', text: 'It provides a standardized template for specifying task environment and agent capabilities' },
          { id: 'b', text: 'It assigns a numerical score to each agent design' },
          { id: 'c', text: 'It only works for physical robots, not software agents' },
          { id: 'd', text: 'It makes all agent designs identical' }
        ],
        correctAnswer: 'a',
        justification: 'PEAS provides common vocabulary to describe and compare agents across different domains systematically.',
        wrongJustifications: {
          b: 'PEAS is descriptive, not a scoring system.',
          c: 'PEAS applies to both physical and software agents.',
          d: 'PEAS highlights differences by making specifications explicit.'
        }
      },
      {
        id: 't5-9',
        question: 'In the PEAS framework for a chess-playing agent, which component includes the opponents moves?',
        options: [
          { id: 'a', text: 'Performance because the opponents moves affect winning' },
          { id: 'b', text: 'Environment because the opponent and moves are external context' },
          { id: 'c', text: 'Actuators because the opponents moves are actions' },
          { id: 'd', text: 'Sensors because the agent senses its own moves' }
        ],
        correctAnswer: 'b',
        justification: 'The Environment includes everything external: the opponent, board state, and game rules.',
        wrongJustifications: {
          a: 'The opponents moves are external events in the environment.',
          c: 'Actuators are the agents own output mechanisms.',
          d: 'Sensors perceive the environment; the opponent is part of the environment.'
        }
      },
      {
        id: 't5-10',
        question: 'How does PEAS relate to rationality in agent design?',
        options: [
          { id: 'a', text: 'PEAS defines the context for evaluating rationality: a rational agent maximizes expected performance given its sensors and knowledge' },
          { id: 'b', text: 'PEAS replaces the need for rationality in agent design' },
          { id: 'c', text: 'Rationality is defined independently of PEAS components' },
          { id: 'd', text: 'PEAS only applies to irrational agents' }
        ],
        correctAnswer: 'a',
        justification: 'A rational agent does the right thing relative to its PEAS specification: maximizing expected performance in its environment with available sensors and actuators.',
        wrongJustifications: {
          b: 'PEAS provides the framework for defining rational behavior.',
          c: 'Rationality is defined relative to the PEAS specification.',
          d: 'PEAS applies to all agents.'
        }
      }
    ],
    recap: [
      'PEAS stands for Performance measure, Environment, Actuators, Sensors.',
      'Performance measure defines success criteria and guides all design decisions.',
      'Environment specifies the external context in which the agent operates.',
      'Actuators are mechanisms through which the agent affects its environment.',
      'Sensors are input devices through which the agent perceives the environment.',
      'Incorrect PEAS specification leads to misaligned agent behavior.',
      'PEAS provides a standardized template for comparing agent designs.',
      'Rationality is evaluated relative to the PEAS specification.'
    ],
    skillMapping: [
      { skill: 'Applying the PEAS Framework to Agent Design', level: 'beginner' },
      { skill: 'Identifying Sensors and Actuators for Tasks', level: 'beginner' },
      { skill: 'Defining Appropriate Performance Measures', level: 'intermediate' },
      { skill: 'Analyzing Agent Rationality in Context', level: 'intermediate' },
      { skill: 'Evaluating PEAS Specifications for Correctness', level: 'advanced' }
    ]
  },
  Topic6_AgentTypesReflex: {
    prerequisites: [
      'PEAS framework understanding',
      'Basic agent-environment interaction',
      'Concept of perception and action',
      'Understanding of condition-action rules',
      'Knowledge of internal state representation'
    ],
    mcqs: [
      {
        id: 't6-1',
        question: 'What is the defining characteristic of a simple reflex agent?',
        options: [
          { id: 'a', text: 'It maintains an internal model of the world to plan future actions' },
          { id: 'b', text: 'It selects actions based solely on the current percept ignoring history' },
          { id: 'c', text: 'It learns from past experiences using machine learning' },
          { id: 'd', text: 'It communicates with other agents to coordinate actions' }
        ],
        correctAnswer: 'b',
        justification: 'Simple reflex agents use condition-action rules that map the current percept directly to an action, without considering percept history.',
        wrongJustifications: {
          a: 'Internal model describes model-based agents.',
          c: 'Simple reflex agents do not learn; they follow fixed rules.',
          d: 'Communication is a feature of more complex agents.'
        }
      },
      {
        id: 't6-2',
        question: 'What limitation makes simple reflex agents unsuitable for partially observable environments?',
        options: [
          { id: 'a', text: 'They are too slow to process partial information' },
          { id: 'b', text: 'They cannot maintain internal state to compensate for missing information' },
          { id: 'c', text: 'They require too much memory for partial observability' },
          { id: 'd', text: 'They work best in partially observable environments' }
        ],
        correctAnswer: 'b',
        justification: 'In partially observable environments, current percept may lack all relevant information. Without internal state, reflex agents cannot infer hidden aspects.',
        wrongJustifications: {
          a: 'Speed is not the issue; lack of internal state is.',
          c: 'Simple reflex agents use minimal memory; the issue is architectural.',
          d: 'They work best in fully observable environments.'
        }
      },
      {
        id: 't6-3',
        question: 'How does a model-based reflex agent differ from a simple reflex agent?',
        options: [
          { id: 'a', text: 'A model-based agent maintains internal state to track unobserved environment aspects' },
          { id: 'b', text: 'A model-based agent is always slower' },
          { id: 'c', text: 'A model-based agent does not use sensors' },
          { id: 'd', text: 'A model-based agent cannot use condition-action rules' }
        ],
        correctAnswer: 'a',
        justification: 'Model-based agents maintain internal state tracking how the environment evolves, enabling them to handle partial observability.',
        wrongJustifications: {
          b: 'Speed depends on implementation; key difference is internal state.',
          c: 'All agents require sensors.',
          d: 'Model-based agents still use condition-action rules with internal state.'
        }
      },
      {
        id: 't6-4',
        question: 'Where would a simple reflex agent perform adequately?',
        options: [
          { id: 'a', text: 'A fully observable environment where current percept uniquely determines correct action' },
          { id: 'b', text: 'A stochastic environment with random outcomes' },
          { id: 'c', text: 'A multi-agent competitive environment' },
          { id: 'd', text: 'An environment requiring long-term planning' }
        ],
        correctAnswer: 'a',
        justification: 'Simple reflex agents work when the environment is fully observable and the correct action depends only on the current state.',
        wrongJustifications: {
          b: 'Stochastic environments often need internal models.',
          c: 'Multi-agent environments require modeling other agents.',
          d: 'Long-term planning requires goal-based agents.'
        }
      },
      {
        id: 't6-5',
        question: 'What is the model in a model-based reflex agent?',
        options: [
          { id: 'a', text: 'A miniature physical replica of the environment' },
          { id: 'b', text: 'Knowledge about how the world works and how actions affect future states' },
          { id: 'c', text: 'The set of all possible actions the agent can take' },
          { id: 'd', text: 'The agents physical appearance' }
        ],
        correctAnswer: 'b',
        justification: 'The model encodes the agents understanding of environment dynamics, enabling prediction and reasoning about action outcomes.',
        wrongJustifications: {
          a: 'The model is an internal representation, not a physical replica.',
          c: 'The action set is separate from the model.',
          d: 'Physical appearance is irrelevant.'
        }
      },
      {
        id: 't6-6',
        question: 'How do goal-based agents extend model-based reflex agents?',
        options: [
          { id: 'a', text: 'Goal-based agents add the ability to consider future consequences when selecting actions' },
          { id: 'b', text: 'Goal-based agents eliminate the need for sensors' },
          { id: 'c', text: 'Goal-based agents remove the internal model entirely' },
          { id: 'd', text: 'Goal-based agents only react to immediate stimuli' }
        ],
        correctAnswer: 'a',
        justification: 'Goal-based agents incorporate information about desired future states and use the model to reason about which actions lead toward those goals.',
        wrongJustifications: {
          b: 'All agents need sensors.',
          c: 'Goal-based agents typically include a model.',
          d: 'Goal-based agents consider future consequences.'
        }
      },
      {
        id: 't6-7',
        question: 'What is the main advantage of utility-based agents over goal-based agents?',
        options: [
          { id: 'a', text: 'Utility-based agents are simpler to implement' },
          { id: 'b', text: 'Utility-based agents handle trade-offs between conflicting goals by assigning numerical preferences' },
          { id: 'c', text: 'Utility-based agents do not need a model of the environment' },
          { id: 'd', text: 'Utility-based agents always achieve all goals simultaneously' }
        ],
        correctAnswer: 'b',
        justification: 'When there are multiple conflicting goals, utility functions measure how good a state is and select actions maximizing overall expected utility.',
        wrongJustifications: {
          a: 'Utility-based agents are more complex.',
          c: 'Utility-based agents still need a model.',
          d: 'Trade-offs mean not all goals can be fully achieved.'
        }
      },
      {
        id: 't6-8',
        question: 'Which agent type is most appropriate for a Mars exploration rover navigating unfamiliar terrain?',
        options: [
          { id: 'a', text: 'Simple reflex agent it responds to obstacles the fastest' },
          { id: 'b', text: 'Goal-based agent with a model it can plan paths toward scientific targets while avoiding hazards' },
          { id: 'c', text: 'A random agent unpredictability is valuable in exploration' },
          { id: 'd', text: 'A table-lookup agent with precomputed actions for all situations' }
        ],
        correctAnswer: 'b',
        justification: 'A goal-based agent with a model can plan routes to scientific targets and navigate unknown terrain.',
        wrongJustifications: {
          a: 'Simple reflexes are insufficient for complex partially observable terrain.',
          c: 'Random actions could endanger the rover.',
          d: 'Precomputing all Martian terrain states is infeasible.'
        }
      },
      {
        id: 't6-9',
        question: 'When does a learning agent become necessary over a pre-programmed agent?',
        options: [
          { id: 'a', text: 'When the environment is fully known and static' },
          { id: 'b', text: 'When the designer cannot anticipate all situations the agent will encounter' },
          { id: 'c', text: 'When computational resources are extremely limited' },
          { id: 'd', text: 'When the agent must always produce deterministic outputs' }
        ],
        correctAnswer: 'b',
        justification: 'Learning agents are essential when the environment is too complex to fully specify behavior in advance.',
        wrongJustifications: {
          a: 'Fully known static environments suit pre-programmed agents.',
          c: 'Learning typically requires more resources.',
          d: 'Deterministic output is achievable with both approaches.'
        }
      },
      {
        id: 't6-10',
        question: 'How do the four basic agent types relate in complexity?',
        options: [
          { id: 'a', text: 'They are all equally complex' },
          { id: 'b', text: 'Each adds capabilities: reflex, +model, +goals, +utility optimization' },
          { id: 'c', text: 'Utility-based agents are simpler than reflex agents' },
          { id: 'd', text: 'The order of complexity is random' }
        ],
        correctAnswer: 'b',
        justification: 'Agent types build on each other: reflex adds perception-action, model-based adds state tracking, goal-based adds planning, utility-based adds preference optimization.',
        wrongJustifications: {
          a: 'They differ in complexity.',
          c: 'Utility-based agents are more complex than reflex agents.',
          d: 'The hierarchy is well-established.'
        }
      }
    ],
    recap: [
      'Simple reflex agents use condition-action rules based only on current percept.',
      'Simple reflex agents fail in partially observable environments.',
      'Model-based reflex agents maintain internal state for unobserved aspects.',
      'Goal-based agents consider future consequences and plan toward desired states.',
      'Utility-based agents handle trade-offs between conflicting goals.',
      'Learning agents adapt through experience when environments are too complex.',
      'Agent types form a hierarchy of increasing capability and complexity.',
      'Choice of agent type depends on environment properties and task requirements.'
    ],
    skillMapping: [
      { skill: 'Identifying Different Agent Types', level: 'beginner' },
      { skill: 'Understanding Simple vs. Model-Based Reflex Agents', level: 'beginner' },
      { skill: 'Differentiating Goal-Based and Utility-Based Agents', level: 'intermediate' },
      { skill: 'Selecting Appropriate Agent Architectures for Tasks', level: 'advanced' }
    ]
  },
  Topic7_EnvironmentTypes: {
    prerequisites: [
      'Basic agent concepts',
      'Understanding of PEAS framework',
      'Knowledge of state spaces',
      'Familiarity with determinism vs. stochasticity',
      'Concept of observability in systems'
    ],
    mcqs: [
      {
        id: 't7-1',
        question: 'What distinguishes a fully observable environment from a partially observable one?',
        options: [
          { id: 'a', text: 'In fully observable environments the agent has access to all relevant state information at each time step' },
          { id: 'b', text: 'Fully observable environments have better graphics' },
          { id: 'c', text: 'Partially observable environments do not affect agent behavior' },
          { id: 'd', text: 'Fully observable environments are always deterministic' }
        ],
        correctAnswer: 'a',
        justification: 'Full observability means the agents sensors provide complete, accurate information about the entire relevant state.',
        wrongJustifications: {
          b: 'Observability is about information access, not visual rendering.',
          c: 'Partial observability significantly impacts agent design.',
          d: 'Observability and determinism are independent properties.'
        }
      },
      {
        id: 't7-2',
        question: 'In a deterministic environment, what happens when the agent performs the same action from the same state?',
        options: [
          { id: 'a', text: 'The outcome is guaranteed to be the same every time' },
          { id: 'b', text: 'The outcome is random and unpredictable' },
          { id: 'c', text: 'The agent receives a different reward each time' },
          { id: 'd', text: 'The environment becomes partially observable' }
        ],
        correctAnswer: 'a',
        justification: 'Deterministic environments have no randomness in state transitions; next state and reward are uniquely determined.',
        wrongJustifications: {
          b: 'Random outcomes characterize stochastic environments.',
          c: 'Rewards are deterministic functions in deterministic environments.',
          d: 'Determinism and observability are independent.'
        }
      },
      {
        id: 't7-3',
        question: 'What characterizes an episodic environment?',
        options: [
          { id: 'a', text: 'Each episode is independent and the agents experience resets between interactions' },
          { id: 'b', text: 'The environment never ends it continues indefinitely' },
          { id: 'c', text: 'The environment is reset randomly every step' },
          { id: 'd', text: 'Episodes only occur in games' }
        ],
        correctAnswer: 'a',
        justification: 'In episodic environments, experience is divided into independent episodes where the starting state resets and actions in one episode do not affect future ones.',
        wrongJustifications: {
          b: 'Continuing indefinitely describes non-episodic environments.',
          c: 'Episodic environments reset at episode boundaries.',
          d: 'Episodic structure appears in many domains beyond games.'
        }
      },
      {
        id: 't7-4',
        question: 'How does a static environment differ from a dynamic environment?',
        options: [
          { id: 'a', text: 'Static environments do not change while the agent deliberates; dynamic environments do' },
          { id: 'b', text: 'Static environments are always fully observable' },
          { id: 'c', text: 'Dynamic environments are better for simple reflex agents' },
          { id: 'd', text: 'Static environments are always deterministic' }
        ],
        correctAnswer: 'a',
        justification: 'Static environments remain unchanged while the agent thinks; dynamic environments evolve even without agent action.',
        wrongJustifications: {
          b: 'Staticity and observability are independent properties.',
          c: 'Dynamic environments are harder for simple reflex agents.',
          d: 'Staticity and determinism are separate properties.'
        }
      },
      {
        id: 't7-5',
        question: 'What is the key characteristic of a discrete environment?',
        options: [
          { id: 'a', text: 'The environment has a finite countable number of distinct states actions and percepts' },
          { id: 'b', text: 'The environment runs on a digital computer' },
          { id: 'c', text: 'The environment is always fully observable' },
          { id: 'd', text: 'The environment requires continuous real numbers for all variables' }
        ],
        correctAnswer: 'a',
        justification: 'Discrete environments have a finite set of distinct states, actions, and percepts, as opposed to continuous environments.',
        wrongJustifications: {
          b: 'Digital computers can simulate both discrete and continuous.',
          c: 'Discreteness and observability are independent.',
          d: 'Continuous variables characterize continuous environments.'
        }
      },
      {
        id: 't7-6',
        question: 'Why is chess considered fully observable, deterministic, and episodic?',
        options: [
          { id: 'a', text: 'The board state is fully visible, moves have fixed outcomes, and each game resets independently' },
          { id: 'b', text: 'Chess is random and partially observable' },
          { id: 'c', text: 'Chess is continuous and dynamic' },
          { id: 'd', text: 'Chess has none of these properties' }
        ],
        correctAnswer: 'a',
        justification: 'Both players see the full board, moving a piece always produces the same result, and each game is independent.',
        wrongJustifications: {
          b: 'Chess has no randomness and the board is fully visible.',
          c: 'Chess has discrete states and is turn-based.',
          d: 'Chess exhibits all three properties.'
        }
      },
      {
        id: 't7-7',
        question: 'What makes a multi-agent environment fundamentally different from single-agent?',
        options: [
          { id: 'a', text: 'Other agents introduce strategic interactions where outcomes depend on others decisions' },
          { id: 'b', text: 'Multi-agent environments are always partially observable' },
          { id: 'c', text: 'Multi-agent environments cannot be simulated' },
          { id: 'd', text: 'Single-agent environments always have more states' }
        ],
        correctAnswer: 'a',
        justification: 'In multi-agent environments, agents must consider that others are also adapting, creating strategic interactions.',
        wrongJustifications: {
          b: 'Multi-agent environments can be fully or partially observable.',
          c: 'Multi-agent environments are commonly simulated.',
          d: 'State count depends on domain, not number of agents.'
        }
      },
      {
        id: 't7-8',
        question: 'Which environment property most motivates internal memory in agents?',
        options: [
          { id: 'a', text: 'Deterministic because outcomes are predictable' },
          { id: 'b', text: 'Partially observable because the agent cannot perceive full state from current sensors alone' },
          { id: 'c', text: 'Discrete because there are finitely many states' },
          { id: 'd', text: 'Episodic because episodes are independent' }
        ],
        correctAnswer: 'b',
        justification: 'In partially observable environments, agents need internal memory to aggregate information over time and infer hidden aspects.',
        wrongJustifications: {
          a: 'Deterministic environments do not inherently require memory.',
          c: 'Discrete environments can be fully observable.',
          d: 'Episodic environments reduce the need for long-term memory.'
        }
      },
      {
        id: 't7-9',
        question: 'How does stochasticity affect agent design compared to deterministic environments?',
        options: [
          { id: 'a', text: 'The agent must handle uncertainty using probabilistic models or expectations' },
          { id: 'b', text: 'The agent can ignore uncertainty because outcomes are always predictable' },
          { id: 'c', text: 'Stochastic environments require no sensors' },
          { id: 'd', text: 'Agent design is identical for both' }
        ],
        correctAnswer: 'a',
        justification: 'In stochastic environments, the same action may lead to different outcomes, requiring probabilistic reasoning.',
        wrongJustifications: {
          b: 'Uncertainty cannot be ignored in stochastic environments.',
          c: 'All environments require sensors.',
          d: 'Stochasticity significantly impacts agent design.'
        }
      },
      {
        id: 't7-10',
        question: 'A self-driving car operates in an environment that is:',
        options: [
          { id: 'a', text: 'Partially observable, stochastic, dynamic, continuous, multi-agent' },
          { id: 'b', text: 'Fully observable, deterministic, static, discrete, single-agent' },
          { id: 'c', text: 'Partially observable, deterministic, static, discrete, single-agent' },
          { id: 'd', text: 'Fully observable, stochastic, static, continuous, multi-agent' }
        ],
        correctAnswer: 'a',
        justification: 'Driving involves limited sensors, unpredictable events, moving objects, continuous control, and multiple agents.',
        wrongJustifications: {
          b: 'Driving is clearly not fully observable or single-agent.',
          c: 'Driving is not deterministic or static.',
          d: 'Driving is partially observable, not fully observable.'
        }
      }
    ],
    recap: [
      'Fully observable: complete state info; partially observable: some info hidden.',
      'Deterministic: fixed outcomes; stochastic: outcomes involve randomness.',
      'Episodic: independent interactions; sequential: actions affect future opportunities.',
      'Static: no change during deliberation; dynamic: world evolves continuously.',
      'Discrete: finite states/actions; continuous: infinite real-valued spaces.',
      'Single-agent: one decision-maker; multi-agent: strategic interactions.',
      'Environment properties directly determine appropriate agent architecture.',
      'Real-world environments are typically complex combinations of these properties.'
    ],
    skillMapping: [
      { skill: 'Classifying Environments by Key Properties', level: 'beginner' },
      { skill: 'Understanding Observability and Its Implications', level: 'beginner' },
      { skill: 'Differentiating Deterministic vs. Stochastic Environments', level: 'intermediate' },
      { skill: 'Analyzing Environment Impact on Agent Design', level: 'intermediate' },
      { skill: 'Characterizing Real-World Environments', level: 'advanced' }
    ]
  },
  Topic8_AgentTypesDetailed: {
    prerequisites: [
      'PEAS framework understanding',
      'Basic agent types (reflex model-based goal-based)',
      'Environment type classification',
      'Knowledge of internal state representation',
      'Concept of learning in agents'
    ],
    mcqs: [
      {
        id: 't8-1',
        question: 'What additional component does a learning agent have that a non-learning agent lacks?',
        options: [
          { id: 'a', text: 'A critic element that provides feedback on the agents performance' },
          { id: 'b', text: 'A larger set of actuators' },
          { id: 'c', text: 'Faster processing speed' },
          { id: 'd', text: 'More sensors for environment perception' }
        ],
        correctAnswer: 'a',
        justification: 'Learning agents have a critic component that evaluates actions and provides feedback to the learning element for performance improvement.',
        wrongJustifications: {
          b: 'Actuator count depends on task, not learning capability.',
          c: 'Learning agents often require more computation.',
          d: 'Sensor count depends on perception needs.'
        }
      },
      {
        id: 't8-2',
        question: 'How does a learning agent use the performance element?',
        options: [
          { id: 'a', text: 'The performance element selects actions based on learned knowledge; it is the acting part of the agent' },
          { id: 'b', text: 'The performance element stores all past experiences' },
          { id: 'c', text: 'The performance element replaces the need for sensors' },
          { id: 'd', text: 'The performance element only runs after the agent stops learning' }
        ],
        correctAnswer: 'a',
        justification: 'The performance element selects actions using current knowledge; the learning element improves this performance element over time.',
        wrongJustifications: {
          b: 'Experience storage is handled by the learning element.',
          c: 'Sensors are still required for perception.',
          d: 'The performance element operates continuously.'
        }
      },
      {
        id: 't8-3',
        question: 'What is the role of the problem generator in a learning agent?',
        options: [
          { id: 'a', text: 'It generates new experiences or experiments to help the agent learn more effectively' },
          { id: 'b', text: 'It creates new problems for the user to solve' },
          { id: 'c', text: 'It identifies bugs in the agents code' },
          { id: 'd', text: 'It reduces the agents action space to speed up learning' }
        ],
        correctAnswer: 'a',
        justification: 'The problem generator suggests exploratory actions leading to novel situations, enabling the learning element to gather data from unexplored states.',
        wrongJustifications: {
          b: 'It generates suggestions for the agents own exploration.',
          c: 'Bug detection is a different activity.',
          d: 'It may expand exploration, not restrict action space.'
        }
      },
      {
        id: 't8-4',
        question: 'How does a knowledge-based agent differ from a simple reflex agent?',
        options: [
          { id: 'a', text: 'Knowledge-based agents represent and reason with explicit knowledge rather than just condition-action pairs' },
          { id: 'b', text: 'Knowledge-based agents do not use sensors' },
          { id: 'c', text: 'Knowledge-based agents are always slower than reflex agents' },
          { id: 'd', text: 'Knowledge-based agents cannot learn from experience' }
        ],
        correctAnswer: 'a',
        justification: 'Knowledge-based agents maintain an explicit knowledge base and use inference to derive new knowledge, offering more flexibility than fixed condition-action rules.',
        wrongJustifications: {
          b: 'Knowledge-based agents still require sensors.',
          c: 'Speed varies by implementation.',
          d: 'Knowledge-based agents can learn by adding new facts.'
        }
      },
      {
        id: 't8-5',
        question: 'Which agent type is best for a medical diagnosis system that must explain its reasoning?',
        options: [
          { id: 'a', text: 'A simple reflex agent with many condition-action rules' },
          { id: 'b', text: 'A knowledge-based agent with an explicit inference engine that can trace reasoning chains' },
          { id: 'c', text: 'A purely reactive agent with no internal representation' },
          { id: 'd', text: 'A random agent that tries all diagnoses' }
        ],
        correctAnswer: 'b',
        justification: 'Knowledge-based agents can explain decisions by showing inference chains from facts to conclusions, critical for medical trust and validation.',
        wrongJustifications: {
          a: 'Simple reflex agents cannot explain beyond the rule that fired.',
          c: 'Reactive agents lack internal representations.',
          d: 'Random diagnosis would be dangerous.'
        }
      },
      {
        id: 't8-6',
        question: 'What is the relationship between agent function and agent program?',
        options: [
          { id: 'a', text: 'The agent function is the abstract mapping from percepts to actions; the agent program is the concrete implementation' },
          { id: 'b', text: 'The agent program is the mathematical ideal; the agent function is the code' },
          { id: 'c', text: 'They are two names for the same thing' },
          { id: 'd', text: 'The agent program runs on the environment and the agent function runs on the agent' }
        ],
        correctAnswer: 'a',
        justification: 'The agent function is a mathematical abstraction describing percept-to-action mapping; the agent program is the actual implementation.',
        wrongJustifications: {
          b: 'This reverses the relationship.',
          c: 'They are related but distinct.',
          d: 'Both describe the agents decision-making.'
        }
      },
      {
        id: 't8-7',
        question: 'How does architecture constrain the agent program?',
        options: [
          { id: 'a', text: 'Architecture determines available sensors actuators memory and processing which limits feasible programs' },
          { id: 'b', text: 'Architecture has no effect on the agent program' },
          { id: 'c', text: 'The agent program determines the architecture' },
          { id: 'd', text: 'All architectures can run any agent program equally well' }
        ],
        correctAnswer: 'a',
        justification: 'The physical or computational architecture provides the platform with specific capabilities that constrain what programs can be implemented.',
        wrongJustifications: {
          b: 'Architecture fundamentally constrains the program.',
          c: 'Architecture precedes and enables the program.',
          d: 'Different architectures have different capabilities.'
        }
      },
      {
        id: 't8-8',
        question: 'What distinguishes an intelligent agent from a simple computer program?',
        options: [
          { id: 'a', text: 'An intelligent agent operates autonomously perceives its environment persists over time and adapts to achieve goals' },
          { id: 'b', text: 'An intelligent agent is just a marketing term for any program' },
          { id: 'c', text: 'A computer program cannot perform any useful tasks' },
          { id: 'd', text: 'Intelligent agents do not need sensors or actuators' }
        ],
        correctAnswer: 'a',
        justification: 'Intelligent agents are characterized by autonomy, perception, persistence, and goal-directed adaptation, unlike typical programs.',
        wrongJustifications: {
          b: 'The term has a specific technical meaning in AI.',
          c: 'Programs perform many useful tasks.',
          d: 'Sensors and actuators are essential.'
        }
      },
      {
        id: 't8-9',
        question: 'In the context of agent types, what is a utility-based agent optimizing?',
        options: [
          { id: 'a', text: 'The agent selects actions that maximize its expected utility where utility measures outcome desirability' },
          { id: 'b', text: 'Utility-based agents minimize the number of actions taken' },
          { id: 'c', text: 'Utility-based agents optimize their physical speed' },
          { id: 'd', text: 'Utility-based agents optimize only the current step ignoring future consequences' }
        ],
        correctAnswer: 'a',
        justification: 'Utility-based agents use a utility function to assign values to states and maximize expected utility considering both immediate and future consequences.',
        wrongJustifications: {
          b: 'Minimizing actions is a possible goal but not the definition.',
          c: 'Physical speed is a hardware constraint.',
          d: 'Utility agents typically consider long-term expected utility.'
        }
      },
      {
        id: 't8-10',
        question: 'How does an agent handle trade-offs between multiple objectives?',
        options: [
          { id: 'a', text: 'By defining a utility function that weights each objective according to its importance' },
          { id: 'b', text: 'By ignoring all but the most important objective' },
          { id: 'c', text: 'By random selection among objectives' },
          { id: 'd', text: 'By alternating between objectives randomly' }
        ],
        correctAnswer: 'a',
        justification: 'Utility functions allow agents to express preferences over multi-dimensional outcomes by assigning weights to different objectives.',
        wrongJustifications: {
          b: 'Ignoring objectives may lead to poor performance.',
          c: 'Random selection is not principled.',
          d: 'Random alternation is arbitrary.'
        }
      }
    ],
    recap: [
      'Learning agents have critic, learning element, performance element, and problem generator.',
      'The performance element selects actions; the learning element improves it over time.',
      'The problem generator suggests exploratory actions for better learning.',
      'Knowledge-based agents use explicit knowledge bases and inference for reasoning.',
      'Knowledge-based agents can explain decisions through reasoning chains.',
      'The agent function is abstract mapping; the agent program is concrete implementation.',
      'Architecture constrains what agent programs can be implemented.',
      'Utility functions enable principled handling of trade-offs between multiple objectives.'
    ],
    skillMapping: [
      { skill: 'Understanding Learning Agent Architecture', level: 'intermediate' },
      { skill: 'Differentiating Agent Function from Agent Program', level: 'intermediate' },
      { skill: 'Applying Knowledge-Based Agent Concepts', level: 'intermediate' },
      { skill: 'Designing Utility Functions for Multi-Objective Trade-offs', level: 'advanced' }
    ]
  },
  Topic9_EnvironmentsDetailed: {
    prerequisites: [
      'Environment type classification',
      'Agent architecture understanding',
      'Knowledge of state transitions',
      'Concept of rewards and feedback',
      'Understanding of environment complexity'
    ],
    mcqs: [
      {
        id: 't9-1',
        question: 'What distinguishes accessible from inaccessible environments?',
        options: [
          { id: 'a', text: 'Accessible environments provide complete accurate state information to the agents sensors' },
          { id: 'b', text: 'Accessible environments are publicly available on the internet' },
          { id: 'c', text: 'Inaccessible environments are always deterministic' },
          { id: 'd', text: 'Accessibility is the same as determinism' }
        ],
        correctAnswer: 'a',
        justification: 'An accessible environment is one where the agents sensors can access the complete state relevant to decision-making.',
        wrongJustifications: {
          b: 'Accessibility refers to information access for the agent.',
          c: 'Inaccessible environments can be stochastic or deterministic.',
          d: 'Accessibility and determinism are distinct properties.'
        }
      },
      {
        id: 't9-2',
        question: 'How does environment complexity affect agent architecture choice?',
        options: [
          { id: 'a', text: 'More complex environments require agents with internal state planning and learning capabilities' },
          { id: 'b', text: 'Environment complexity has no effect on architecture choice' },
          { id: 'c', text: 'Simple reflex agents are best for the most complex environments' },
          { id: 'd', text: 'More complex environments require simpler agents' }
        ],
        correctAnswer: 'a',
        justification: 'As environments become more complex, agents need more sophisticated capabilities like internal state, modeling, and learning.',
        wrongJustifications: {
          b: 'Environment properties are the primary factor in architecture choice.',
          c: 'Simple reflex agents suit only the simplest environments.',
          d: 'Complex environments demand more sophisticated agents.'
        }
      },
      {
        id: 't9-3',
        question: 'What characterizes a stochastic environment?',
        options: [
          { id: 'a', text: 'The next state is not uniquely determined; there is a probability distribution over outcomes' },
          { id: 'b', text: 'The environment has no rules at all' },
          { id: 'c', text: 'The agent cannot perceive anything' },
          { id: 'd', text: 'The environment changes deterministically' }
        ],
        correctAnswer: 'a',
        justification: 'In stochastic environments, state transitions are governed by probability distributions, leading to uncertain outcomes.',
        wrongJustifications: {
          b: 'Stochastic environments have structure with probabilistic rules.',
          c: 'Perception is independent of stochasticity.',
          d: 'Deterministic change is the opposite of stochastic.'
        }
      },
      {
        id: 't9-4',
        question: 'Why are episodic environments generally easier for agents to learn in?',
        options: [
          { id: 'a', text: 'Each episode is independent so agents focus on immediate interactions without compound long-term consequences' },
          { id: 'b', text: 'Episodic environments have fewer total states' },
          { id: 'c', text: 'Episodic environments are always deterministic' },
          { id: 'd', text: 'Episodic environments require complex planning' }
        ],
        correctAnswer: 'a',
        justification: 'Independent episodes simplify credit assignment and allow independent learning from each experience.',
        wrongJustifications: {
          b: 'The ease comes from independence, not state count.',
          c: 'Episodic environments can be stochastic.',
          d: 'Episodic environments require less planning.'
        }
      },
      {
        id: 't9-5',
        question: 'In a sequential environment why must agents consider future consequences?',
        options: [
          { id: 'a', text: 'Current decisions affect future states and opportunities, impacting long-term goals' },
          { id: 'b', text: 'Sequential environments always have delayed rewards' },
          { id: 'c', text: 'Sequential environments are always stochastic' },
          { id: 'd', text: 'The agent cannot perceive the current state' }
        ],
        correctAnswer: 'a',
        justification: 'In sequential environments, decisions have persistent consequences across time steps, requiring long-term evaluation.',
        wrongJustifications: {
          b: 'Delayed rewards are common but not a necessary condition.',
          c: 'Sequential environments can be deterministic.',
          d: 'Perception is possible; the challenge is temporal dependency.'
        }
      },
      {
        id: 't9-6',
        question: 'How do other adaptive agents change the environment from a single agents perspective?',
        options: [
          { id: 'a', text: 'The environment becomes non-stationary because others change their behavior over time' },
          { id: 'b', text: 'Other agents make the environment easier' },
          { id: 'c', text: 'The presence of other agents does not affect environment dynamics' },
          { id: 'd', text: 'Other agents make the environment fully observable' }
        ],
        correctAnswer: 'a',
        justification: 'When other agents learn and adapt, environment dynamics change over time, creating non-stationarity.',
        wrongJustifications: {
          b: 'Others generally increase complexity.',
          c: 'Other agents fundamentally change the dynamics.',
          d: 'Other agents do not improve observability.'
        }
      },
      {
        id: 't9-7',
        question: 'How does environment granularity (discrete vs. continuous) affect agent design?',
        options: [
          { id: 'a', text: 'Continuous environments require function approximation or discretization; discrete allows table-based approaches' },
          { id: 'b', text: 'Discrete environments are always easier for all agents' },
          { id: 'c', text: 'Continuous environments have no effect on learning algorithms' },
          { id: 'd', text: 'All real-world environments are discrete' }
        ],
        correctAnswer: 'a',
        justification: 'Continuous spaces cannot be exhaustively tabled, requiring function approximation methods like neural networks.',
        wrongJustifications: {
          b: 'Discrete environments can be astronomically large.',
          c: 'Continuous environments require fundamentally different algorithms.',
          d: 'Most real-world environments are continuous.'
        }
      },
      {
        id: 't9-8',
        question: 'Why might a known (modeled) environment be preferable for certain applications?',
        options: [
          { id: 'a', text: 'Known environments allow optimal planning using the model without trial-and-error learning' },
          { id: 'b', text: 'Known environments always have higher rewards' },
          { id: 'c', text: 'Unknown environments are always impossible to work with' },
          { id: 'd', text: 'Known environments do not require sensors' }
        ],
        correctAnswer: 'a',
        justification: 'When dynamics are known, agents can compute optimal policies through planning rather than learning through interaction.',
        wrongJustifications: {
          b: 'Knowledge of dynamics does not guarantee higher rewards.',
          c: 'Unknown environments can be handled via model-free RL.',
          d: 'Sensors are still needed for state perception.'
        }
      },
      {
        id: 't9-9',
        question: 'How do real-time requirements affect agent design in dynamic environments?',
        options: [
          { id: 'a', text: 'Hard real-time requires guaranteed deadlines; soft real-time allows occasional delays affecting deliberation complexity' },
          { id: 'b', text: 'Real-time requirements only affect the user interface' },
          { id: 'c', text: 'Real-time requirements are irrelevant in AI agent design' },
          { id: 'd', text: 'All dynamic environments are soft real-time' }
        ],
        correctAnswer: 'a',
        justification: 'Hard real-time systems must meet strict deadlines, limiting computation per step; soft real-time allows occasional misses.',
        wrongJustifications: {
          b: 'Real-time impacts feasibility of complex reasoning.',
          c: 'Real-time requirements are critical in robotics and autonomous systems.',
          d: 'Dynamic environments can have hard or soft constraints.'
        }
      },
      {
        id: 't9-10',
        question: 'What is the significance of law-like vs. chaotic environment behavior?',
        options: [
          { id: 'a', text: 'Law-like environments follow regular patterns for learning; chaotic environments have extreme sensitivity limiting long-term prediction' },
          { id: 'b', text: 'Law-like environments require no agent intelligence' },
          { id: 'c', text: 'Chaotic environments are completely random with no patterns' },
          { id: 'd', text: 'Both are equally predictable' }
        ],
        correctAnswer: 'a',
        justification: 'Law-like environments follow consistent rules enabling learning. Chaotic environments are sensitive to initial conditions, limiting long-term prediction.',
        wrongJustifications: {
          b: 'Agents still need to discover and exploit regularities.',
          c: 'Chaotic systems are deterministic, not random.',
          d: 'Law-like environments are more predictable long-term.'
        }
      }
    ],
    recap: [
      'Accessible environments provide complete state information to sensors.',
      'Environment complexity drives sophistication required in agent architecture.',
      'Stochastic environments have probabilistic transitions requiring expectation-based reasoning.',
      'Episodic environments simplify learning due to independence.',
      'Sequential environments require consideration of long-term consequences.',
      'Multi-agent environments are non-stationary due to other learning agents.',
      'Continuous environments require function approximation methods.',
      'Known environments enable model-based planning without trial-and-error.'
    ],
    skillMapping: [
      { skill: 'Classifying Environments by Accessibility and Determinism', level: 'beginner' },
      { skill: 'Understanding Episodic vs. Sequential Trade-offs', level: 'intermediate' },
      { skill: 'Analyzing Multi-Agent Environment Dynamics', level: 'advanced' },
      { skill: 'Selecting Agent Architectures Based on Environment Properties', level: 'advanced' }
    ]
  },
  Topic10_MCIntro: {
    prerequisites: [
      'Understanding of reinforcement learning fundamentals',
      'Knowledge of value functions and policy concepts',
      'Familiarity with dynamic programming methods',
      'Concept of episodes and returns',
      'Understanding of model-free vs. model-based learning'
    ],
    mcqs: [
      {
        id: 't10-1',
        question: 'What is the fundamental idea behind Monte Carlo methods in reinforcement learning?',
        options: [
          { id: 'a', text: 'They estimate value functions by averaging complete returns from sampled episodes' },
          { id: 'b', text: 'They use dynamic programming to compute exact value functions' },
          { id: 'c', text: 'They rely on a known model of the environment to simulate trajectories' },
          { id: 'd', text: 'They update values after every single step using bootstrapping' }
        ],
        correctAnswer: 'a',
        justification: 'Monte Carlo methods learn from complete episodes by averaging actual returns observed, without requiring a model of environment dynamics.',
        wrongJustifications: {
          b: 'MC methods do not require dynamic programming or a model.',
          c: 'MC methods are model-free.',
          d: 'Step-wise bootstrapping describes TD learning, not MC.'
        }
      },
      {
        id: 't10-2',
        question: 'Why must Monte Carlo methods wait until the end of an episode to update values?',
        options: [
          { id: 'a', text: 'Because MC methods need the complete return to compute the actual discounted return for each state visited' },
          { id: 'b', text: 'Because MC methods are slower than other methods' },
          { id: 'c', text: 'Because MC methods do not use rewards at all' },
          { id: 'd', text: 'Because MC methods can only update at the end by definition' }
        ],
        correctAnswer: 'a',
        justification: 'MC methods compute the return G_t as the sum of discounted future rewards, requiring the complete episode trajectory to calculate.',
        wrongJustifications: {
          b: 'The reason is mathematical necessity, not speed comparison.',
          c: 'MC methods critically depend on observed rewards.',
          d: 'The deeper reason is that the full return requires the complete trajectory.'
        }
      },
      {
        id: 't10-3',
        question: 'How do Monte Carlo methods achieve model-free learning?',
        options: [
          { id: 'a', text: 'They learn directly from experience without requiring knowledge of transition probabilities or reward functions' },
          { id: 'b', text: 'They build an explicit model of the environment first' },
          { id: 'c', text: 'They use random guessing instead of learning' },
          { id: 'd', text: 'They require a simulator to generate experience' }
        ],
        correctAnswer: 'a',
        justification: 'MC methods are model-free because they estimate value functions purely from sampled episodes without needing environment dynamics.',
        wrongJustifications: {
          b: 'Building a model would make it model-based.',
          c: 'MC methods systematically learn from experience.',
          d: 'MC does not require a model of dynamics.'
        }
      },
      {
        id: 't10-4',
        question: 'What is the key advantage of Monte Carlo methods over dynamic programming?',
        options: [
          { id: 'a', text: 'MC methods do not require a complete model of the environment dynamics' },
          { id: 'b', text: 'MC methods are always guaranteed to find the optimal policy' },
          { id: 'c', text: 'MC methods do not require any computation' },
          { id: 'd', text: 'MC methods work only for episodic tasks' }
        ],
        correctAnswer: 'a',
        justification: 'Dynamic programming requires a complete model; MC methods learn from experience without a model.',
        wrongJustifications: {
          b: 'MC methods have variance and may not always converge optimally.',
          c: 'MC methods still require computation.',
          d: 'This describes a limitation, not an advantage.'
        }
      },
      {
        id: 't10-5',
        question: 'What task structure do Monte Carlo methods rely on?',
        options: [
          { id: 'a', text: 'The task must be episodic with well-defined termination to compute complete returns' },
          { id: 'b', text: 'The task must be continuing never-ending' },
          { id: 'c', text: 'The task must have discrete state and action spaces' },
          { id: 'd', text: 'The task must be deterministic' }
        ],
        correctAnswer: 'a',
        justification: 'Classic MC methods require episodic tasks because they compute returns from complete episodes.',
        wrongJustifications: {
          b: 'Continuing tasks pose a challenge for MC.',
          c: 'MC can handle both discrete and continuous spaces.',
          d: 'MC can handle stochastic environments.'
        }
      },
      {
        id: 't10-6',
        question: 'How does the return G_t relate to the value function V(s) in MC methods?',
        options: [
          { id: 'a', text: 'V(s) is the expected value of G_t from state s; MC estimates this by averaging observed returns' },
          { id: 'b', text: 'V(s) is the maximum possible return from state s' },
          { id: 'c', text: 'G_t is always equal to V(s) for every episode' },
          { id: 'd', text: 'V(s) and G_t are unrelated concepts' }
        ],
        correctAnswer: 'a',
        justification: 'V(s) is defined as the expected return from state s. MC estimates it by averaging sampled returns G_t.',
        wrongJustifications: {
          b: 'V(s) is the expected (average), not maximum return.',
          c: 'G_t is a sample; V(s) is the expectation of G_t.',
          d: 'V(s) is precisely defined in terms of G_t.'
        }
      },
      {
        id: 't10-7',
        question: 'What statistical principle underlies Monte Carlo value estimation?',
        options: [
          { id: 'a', text: 'The law of large numbers as more episodes are sampled the average return converges to the expected value' },
          { id: 'b', text: 'The central limit theorem returns are always normally distributed' },
          { id: 'c', text: 'Bayes theorem prior knowledge is updated with evidence' },
          { id: 'd', text: 'The Markov property future depends only on the present' }
        ],
        correctAnswer: 'a',
        justification: 'MC estimation relies on the law of large numbers: averaging many sampled returns converges to the true expected value.',
        wrongJustifications: {
          b: 'Returns are not necessarily normally distributed.',
          c: 'Basic MC uses frequentist averaging.',
          d: 'The Markov property is important for RL but not the statistical principle of MC.'
        }
      },
      {
        id: 't10-8',
        question: 'How do MC methods handle the exploration-exploitation trade-off?',
        options: [
          { id: 'a', text: 'They use policies like epsilon-soft or exploring starts to ensure all state-action pairs are visited' },
          { id: 'b', text: 'They only exploit the best known actions' },
          { id: 'c', text: 'They randomly choose actions without any policy structure' },
          { id: 'd', text: 'They do not need exploration because they use a model' }
        ],
        correctAnswer: 'a',
        justification: 'MC methods ensure exploration through epsilon-soft policies or exploring starts to visit all state-action pairs.',
        wrongJustifications: {
          b: 'Pure exploitation would miss better actions.',
          c: 'MC uses structured policies balancing exploration and exploitation.',
          d: 'MC methods are model-free and still need exploration.'
        }
      },
      {
        id: 't10-9',
        question: 'What is a key limitation of MC methods compared to TD learning?',
        options: [
          { id: 'a', text: 'MC methods have higher variance because they use full returns that accumulate noise from many steps' },
          { id: 'b', text: 'MC methods require less computation per step' },
          { id: 'c', text: 'MC methods always converge faster than TD' },
          { id: 'd', text: 'MC methods do not require episodes' }
        ],
        correctAnswer: 'a',
        justification: 'MC returns incorporate rewards from many steps with randomness, leading to higher variance estimates than TD bootstrapping.',
        wrongJustifications: {
          b: 'MC requires storing complete episode trajectories.',
          c: 'MC often converges more slowly.',
          d: 'MC requires episodes.'
        }
      },
      {
        id: 't10-10',
        question: 'When would MC methods be preferred over TD learning?',
        options: [
          { id: 'a', text: 'When the environment has non-Markovian dynamics or function approximation causes bootstrap bias' },
          { id: 'b', text: 'When the task is continuing with no episode boundaries' },
          { id: 'c', text: 'When computation must be done incrementally after every step' },
          { id: 'd', text: 'When the state space is very large and continuous' }
        ],
        correctAnswer: 'a',
        justification: 'MC does not bootstrap, so it avoids bias from function approximation and can handle non-Markovian environments.',
        wrongJustifications: {
          b: 'MC requires episodic tasks.',
          c: 'MC updates only at episode end.',
          d: 'Large state spaces favor TD methods.'
        }
      }
    ],
    recap: [
      'Monte Carlo methods learn value functions by averaging complete returns from sampled episodes.',
      'MC methods are model-free, requiring no knowledge of transition probabilities.',
      'MC methods require episodic tasks to compute complete returns.',
      'The return G_t is the sum of discounted rewards over the episode.',
      'MC estimation relies on the law of large numbers for convergence.',
      'Exploration is ensured via epsilon-soft policies or exploring starts.',
      'MC methods have higher variance but lower bias compared to TD learning.',
      'MC methods can handle non-Markovian environments where bootstrapping may struggle.'
    ],
    skillMapping: [
      { skill: 'Understanding Monte Carlo Principles in RL', level: 'intermediate' },
      { skill: 'Differentiating Model-Free vs. Model-Based Learning', level: 'intermediate' },
      { skill: 'Computing Returns from Episode Experiences', level: 'intermediate' },
      { skill: 'Comparing MC with TD Learning and Dynamic Programming', level: 'advanced' }
    ]
  },
  Topic11_MCBackupDiagrams: {
    prerequisites: [
      'Introduction to Monte Carlo methods',
      'Understanding of value functions',
      'Knowledge of return computation',
      'Familiarity with state transitions',
      'Concept of bootstrapping in RL'
    ],
    mcqs: [
      {
        id: 't11-1',
        question: 'What does a Monte Carlo backup diagram represent?',
        options: [
          { id: 'a', text: 'A full trajectory from start state to terminal state showing all states actions and rewards' },
          { id: 'b', text: 'A single transition from one state to the next' },
          { id: 'c', text: 'Only the final reward at episode termination' },
          { id: 'd', text: 'The agents internal architecture' }
        ],
        correctAnswer: 'a',
        justification: 'MC backup diagrams depict the complete episode trajectory from start through all intermediate states to termination.',
        wrongJustifications: {
          b: 'Single transitions are shown in TD backup diagrams.',
          c: 'MC diagrams include all rewards, not just terminal.',
          d: 'Backup diagrams represent value update pathways.'
        }
      },
      {
        id: 't11-2',
        question: 'How does an MC backup diagram differ from a TD backup diagram?',
        options: [
          { id: 'a', text: 'MC shows entire episode path; TD shows single-step transition with bootstrapping' },
          { id: 'b', text: 'MC diagrams are drawn in red; TD diagrams in blue' },
          { id: 'c', text: 'There is no difference between them' },
          { id: 'd', text: 'TD shows full episodes; MC shows single steps' }
        ],
        correctAnswer: 'a',
        justification: 'MC backup diagrams trace the complete episode without bootstrapping, while TD diagrams show one-step transitions with a bootstrap from the next state.',
        wrongJustifications: {
          b: 'Colors are not standardized; irrelevant to meaning.',
          c: 'They differ fundamentally in update depth.',
          d: 'This reverses the actual relationship.'
        }
      },
      {
        id: 't11-3',
        question: 'In an MC backup diagram what does the value update depend on?',
        options: [
          { id: 'a', text: 'The actual rewards observed along the entire sampled episode trajectory' },
          { id: 'b', text: 'The estimated value of the next state (bootstrapping)' },
          { id: 'c', text: 'Only the first reward received' },
          { id: 'd', text: 'The agents prior knowledge encoded in the policy' }
        ],
        correctAnswer: 'a',
        justification: 'MC updates are based purely on actual experienced returns from the complete episode, without bootstrapping.',
        wrongJustifications: {
          b: 'Bootstrapping characterizes TD methods.',
          c: 'MC uses all rewards from the episode.',
          d: 'The policy influences visitation, but the update uses observed rewards.'
        }
      },
      {
        id: 't11-4',
        question: 'Why is there no bootstrapping arrow in an MC backup diagram?',
        options: [
          { id: 'a', text: 'Because MC methods do not use estimated values of successor states to update current state value' },
          { id: 'b', text: 'Because MC methods only update terminal states' },
          { id: 'c', text: 'Because bootstrapping arrows are optional and usually omitted' },
          { id: 'd', text: 'Because MC methods use a different type of bootstrapping' }
        ],
        correctAnswer: 'a',
        justification: 'MC methods do not bootstrap; they use only actual observed returns, so no bootstrapping arrow exists in the diagram.',
        wrongJustifications: {
          b: 'MC updates all states visited during the episode.',
          c: 'Bootstrapping arrows are absent because MC does not bootstrap.',
          d: 'MC methods are defined by the absence of bootstrapping.'
        }
      },
      {
        id: 't11-5',
        question: 'What information flows backward in an MC backup diagram?',
        options: [
          { id: 'a', text: 'The total return from the episode propagates back to update values of previously visited states' },
          { id: 'b', text: 'The policy parameters flow from terminal state to initial state' },
          { id: 'c', text: 'The sensor readings propagate backward through time' },
          { id: 'd', text: 'Nothing flows backward; diagrams only show forward trajectories' }
        ],
        correctAnswer: 'a',
        justification: 'Backup refers to using the return computed at episode end to update value estimates of states encountered earlier.',
        wrongJustifications: {
          b: 'Policy parameters are not shown in value backup diagrams.',
          c: 'Sensor readings are forward perception.',
          d: 'Backward propagation of return is what backup illustrates.'
        }
      },
      {
        id: 't11-6',
        question: 'How does the depth of an MC backup diagram compare to other methods?',
        options: [
          { id: 'a', text: 'MC methods use the full episode depth going all the way to termination' },
          { id: 'b', text: 'MC methods only look one step ahead' },
          { id: 'c', text: 'MC depth varies randomly' },
          { id: 'd', text: 'MC methods have no depth they only use final rewards' }
        ],
        correctAnswer: 'a',
        justification: 'MC methods always use the complete trajectory from the current state to termination, maximizing depth.',
        wrongJustifications: {
          b: 'One-step lookahead describes TD(0).',
          c: 'Depth is always full episode.',
          d: 'MC uses all intermediate rewards.'
        }
      },
      {
        id: 't11-7',
        question: 'What does the depth of an MC backup diagram imply about variance?',
        options: [
          { id: 'a', text: 'Long trajectories mean returns incorporate many random variables, leading to higher variance' },
          { id: 'b', text: 'Longer trajectories always reduce variance' },
          { id: 'c', text: 'The shape has no relationship with variance' },
          { id: 'd', text: 'MC diagrams show single steps so variance is low' }
        ],
        correctAnswer: 'a',
        justification: 'Each reward in the trajectory may be random; longer trajectories accumulate more noise, resulting in higher variance.',
        wrongJustifications: {
          b: 'Longer trajectories typically increase variance.',
          c: 'Backup depth directly relates to variance.',
          d: 'MC shows full episodes, not single steps.'
        }
      },
      {
        id: 't11-8',
        question: 'How does first-visit MC backup differ from every-visit MC?',
        options: [
          { id: 'a', text: 'First-visit updates only the first state visit per episode; every-visit updates every occurrence' },
          { id: 'b', text: 'First-visit MC shows longer trajectories' },
          { id: 'c', text: 'Every-visit MC does not have a backup diagram' },
          { id: 'd', text: 'First-visit MC uses TD backup diagrams' }
        ],
        correctAnswer: 'a',
        justification: 'Both use the same backup diagram structure but differ in how many times per episode each state is updated.',
        wrongJustifications: {
          b: 'Both use the same trajectories.',
          c: 'Both methods have similar backup diagrams.',
          d: 'Both are MC methods using full-episode returns.'
        }
      },
      {
        id: 't11-9',
        question: 'What key insight does an MC backup diagram convey?',
        options: [
          { id: 'a', text: 'State value is updated based on complete actual return to termination without relying on other estimates' },
          { id: 'b', text: 'State value depends only on the immediate reward' },
          { id: 'c', text: 'The backup process requires a model of the environment' },
          { id: 'd', text: 'Values are updated during the episode not after' }
        ],
        correctAnswer: 'a',
        justification: 'The MC backup diagram shows that value estimates are updated using the complete actual return without bootstrapping.',
        wrongJustifications: {
          b: 'MC values depend on all future rewards.',
          c: 'MC methods are model-free.',
          d: 'MC updates happen after the episode ends.'
        }
      },
      {
        id: 't11-10',
        question: 'How would an n-step TD backup diagram compare to an MC backup diagram?',
        options: [
          { id: 'a', text: 'n-step TD shows n steps of actual rewards followed by bootstrapping; MC shows all steps without bootstrapping' },
          { id: 'b', text: 'n-step TD and MC backup diagrams are identical' },
          { id: 'c', text: 'MC diagrams show n steps; n-step TD shows full episodes' },
          { id: 'd', text: 'n-step TD does not use backup diagrams' }
        ],
        correctAnswer: 'a',
        justification: 'n-step TD shows n steps of real experience with a bootstrap, while MC goes all the way to termination with no bootstrap.',
        wrongJustifications: {
          b: 'They differ in depth and bootstrapping usage.',
          c: 'This reverses the two methods.',
          d: 'n-step TD methods have their own backup diagrams.'
        }
      }
    ],
    recap: [
      'MC backup diagrams show the complete episode trajectory from start to terminal state.',
      'MC diagrams have no bootstrapping arrows since MC does not use successor state estimates.',
      'Backup refers to propagating total return backward to update visited states.',
      'MC updates use all rewards from the episode.',
      'Full-depth trajectories in MC lead to higher variance compared to TD.',
      'First-visit and every-visit MC share the same backup diagram structure.',
      'n-step TD backup diagrams show a hybrid: n actual steps followed by bootstrapping.',
      'MC backup diagrams emphasize model-free learning from complete episodes.'
    ],
    skillMapping: [
      { skill: 'Interpreting Monte Carlo Backup Diagrams', level: 'intermediate' },
      { skill: 'Comparing MC TD and n-step TD Backup Diagrams', level: 'intermediate' },
      { skill: 'Understanding the Absence of Bootstrapping in MC', level: 'intermediate' },
      { skill: 'Analyzing Variance Implications of Full-Episode Backups', level: 'advanced' }
    ]
  },
  Topic12_MCAlgorithms: {
    prerequisites: [
      'Monte Carlo introduction',
      'Backup diagram understanding',
      'Knowledge of value iteration concepts',
      'Understanding of first-visit vs. every-visit',
      'Familiarity with policy evaluation'
    ],
    mcqs: [
      {
        id: 't12-1',
        question: 'What is the key difference between first-visit and every-visit Monte Carlo methods?',
        options: [
          { id: 'a', text: 'First-visit MC considers only the first state return per episode; every-visit MC uses returns from all visits' },
          { id: 'b', text: 'First-visit MC is on-policy; every-visit MC is off-policy' },
          { id: 'c', text: 'Every-visit MC does not use episodes' },
          { id: 'd', text: 'First-visit MC has higher variance than every-visit MC' }
        ],
        correctAnswer: 'a',
        justification: 'First-visit MC averages only returns from the first occurrence of each state per episode; every-visit MC averages returns from all occurrences.',
        wrongJustifications: {
          b: 'Both can be on-policy or off-policy.',
          c: 'Both require episodes.',
          d: 'First-visit MC typically has lower variance.'
        }
      },
      {
        id: 't12-2',
        question: 'How does every-visit MC estimate state value?',
        options: [
          { id: 'a', text: 'It averages returns from every occurrence of the state within each episode including multiple visits' },
          { id: 'b', text: 'It only uses the last visit to each state in each episode' },
          { id: 'c', text: 'It ignores return information and uses random values' },
          { id: 'd', text: 'It uses the maximum return observed from each state' }
        ],
        correctAnswer: 'a',
        justification: 'Every-visit MC uses every occurrence of a state to compute a return, then averages all returns across episodes.',
        wrongJustifications: {
          b: 'Only the last visit discards most information.',
          c: 'All MC methods use actual observed returns.',
          d: 'MC averages returns; it does not take maximums.'
        }
      },
      {
        id: 't12-3',
        question: 'What is the convergence property of first-visit MC for state values?',
        options: [
          { id: 'a', text: 'It converges to the true expected value with variance falling as 1/n where n is first-visit count' },
          { id: 'b', text: 'It never converges to the true value' },
          { id: 'c', text: 'It converges only for deterministic environments' },
          { id: 'd', text: 'It converges instantly after one episode' }
        ],
        correctAnswer: 'a',
        justification: 'First-visit MC produces independent samples of returns; by the law of large numbers, the average converges with variance O(1/n).',
        wrongJustifications: {
          b: 'It converges under standard assumptions.',
          c: 'It converges for both deterministic and stochastic environments.',
          d: 'Convergence requires many episodes.'
        }
      },
      {
        id: 't12-4',
        question: 'Why might every-visit MC be preferred over first-visit MC?',
        options: [
          { id: 'a', text: 'Every-visit MC makes more efficient use of episode data by using all visits' },
          { id: 'b', text: 'Every-visit MC requires less memory' },
          { id: 'c', text: 'Every-visit MC always converges faster' },
          { id: 'd', text: 'Every-visit MC does not require episode termination' }
        ],
        correctAnswer: 'a',
        justification: 'Every-visit MC uses all state visits, extracting more learning signal from each episode, beneficial when episodes are expensive.',
        wrongJustifications: {
          b: 'Every-visit requires tracking more visit counts.',
          c: 'It may converge faster or slower; it introduces bias from correlated samples.',
          d: 'Every-visit still requires episode termination.'
        }
      },
      {
        id: 't12-5',
        question: 'In MC policy evaluation how is the value function updated after each episode?',
        options: [
          { id: 'a', text: 'V(S_t) gets updated toward the complete observed return G_t using incremental mean or constant step-size' },
          { id: 'b', text: 'V(S_t) is set to the max over actions of Q(S_t a)' },
          { id: 'c', text: 'V(S_t) is updated using R_{t+1} plus gamma times V(S_{t+1})' },
          { id: 'd', text: 'V(S_t) is not updated; only Q(S_t a) is updated' }
        ],
        correctAnswer: 'a',
        justification: 'MC policy evaluation updates V(s) toward the complete observed return using an incremental mean update.',
        wrongJustifications: {
          b: 'Max over actions is part of policy improvement.',
          c: 'The TD update uses bootstrapping not used in MC.',
          d: 'MC policy evaluation updates V(s) directly.'
        }
      },
      {
        id: 't12-6',
        question: 'How does episode storage affect MC algorithm choice?',
        options: [
          { id: 'a', text: 'MC must store the entire episode trajectory until termination to compute returns' },
          { id: 'b', text: 'MC can update incrementally after each step without storing history' },
          { id: 'c', text: 'MC stores only the final reward' },
          { id: 'd', text: 'MC requires no memory beyond the current state' }
        ],
        correctAnswer: 'a',
        justification: 'MC methods must remember the sequence of states, actions, and rewards because returns are computed backward after termination.',
        wrongJustifications: {
          b: 'Step-by-step incremental updates describe TD methods.',
          c: 'MC needs intermediate rewards for discounted returns.',
          d: 'MC requires storing the full trajectory.'
        }
      },
      {
        id: 't12-7',
        question: 'What is the bias-variance trade-off between first-visit and every-visit MC?',
        options: [
          { id: 'a', text: 'First-visit MC is unbiased with higher variance; every-visit MC has some bias but can have lower variance' },
          { id: 'b', text: 'First-visit MC has lower variance; every-visit is unbiased' },
          { id: 'c', text: 'Both are unbiased with identical variance' },
          { id: 'd', text: 'Both are biased toward zero' }
        ],
        correctAnswer: 'a',
        justification: 'First-visit returns are independent and unbiased. Every-visit uses correlated samples (within an episode) introducing some bias but potentially reducing variance.',
        wrongJustifications: {
          b: 'First-visit is unbiased but has higher variance.',
          c: 'Every-visit introduces bias from correlated samples.',
          d: 'First-visit is unbiased.'
        }
      },
      {
        id: 't12-8',
        question: 'What is the algorithmic difference in implementation between first-visit and every-visit MC?',
        options: [
          { id: 'a', text: 'First-visit checks whether a state has been visited before in the episode before updating; every-visit updates each time' },
          { id: 'b', text: 'First-visit runs on CPU; every-visit runs on GPU' },
          { id: 'c', text: 'First-visit uses TD updates; every-visit uses MC updates' },
          { id: 'd', text: 'First-visit skips terminal states; every-visit skips initial states' }
        ],
        correctAnswer: 'a',
        justification: 'First-visit MC maintains a visited-set per episode and updates only on first occurrence; every-visit updates on every occurrence.',
        wrongJustifications: {
          b: 'Hardware distinction is irrelevant.',
          c: 'Both use MC updates.',
          d: 'Both handle terminal and initial states similarly.'
        }
      },
      {
        id: 't12-9',
        question: 'For MC control why must we maintain separate estimates for each state-action pair?',
        options: [
          { id: 'a', text: 'To evaluate the value of taking specific actions which is needed for policy improvement without a model' },
          { id: 'b', text: 'Because state values are insufficient for determining optimal actions' },
          { id: 'c', text: 'Both a and b are correct' },
          { id: 'd', text: 'Neither; only state values are needed for control' }
        ],
        correctAnswer: 'c',
        justification: 'Without a model, we need action values to improve the policy; state values alone cannot determine which action is best without knowing transition probabilities.',
        wrongJustifications: {
          a: 'Partially correct but incomplete.',
          b: 'Partially correct but incomplete.',
          d: 'State values alone are insufficient for model-free control.'
        }
      },
      {
        id: 't12-10',
        question: 'In MC control what is the exploring starts assumption?',
        options: [
          { id: 'a', text: 'Every state-action pair has non-zero probability of being selected as the start of an episode' },
          { id: 'b', text: 'The agent always starts exploring after reaching the goal' },
          { id: 'c', text: 'The agent explores only during the first episode' },
          { id: 'd', text: 'Exploring starts means the agent uses a random policy throughout' }
        ],
        correctAnswer: 'a',
        justification: 'Exploring starts ensures that every state-action pair is visited infinitely often by allowing any pair to be the episode start, guaranteeing convergence.',
        wrongJustifications: {
          b: 'Exploration must occur throughout learning.',
          c: 'Exploration must continue across episodes.',
          d: 'Exploring starts applies to episode initiation, not the entire policy.'
        }
      }
    ],
    recap: [
      'First-visit MC: averages returns only from first state visit per episode; unbiased.',
      'Every-visit MC: averages returns from all visits; more data efficient but biased.',
      'First-visit MC converges to true value with variance O(1/n).',
      'Every-visit MC extracts more learning signal from each episode.',
      'MC policy evaluation updates V(s) toward the complete observed return.',
      'MC must store entire episode trajectories for post-hoc return computation.',
      'MC control requires action-value estimation for model-free policy improvement.',
      'Exploring starts ensures every state-action pair is visited.'
    ],
    skillMapping: [
      { skill: 'Differentiating First-Visit vs. Every-Visit MC', level: 'intermediate' },
      { skill: 'Understanding MC Policy Evaluation', level: 'intermediate' },
      { skill: 'Analyzing Bias-Variance Trade-off in MC', level: 'advanced' },
      { skill: 'Implementing MC Control with Exploring Starts', level: 'advanced' }
    ]
  },
  Topic13_MCPrediction: {
    prerequisites: [
      'Monte Carlo algorithms understanding',
      'Knowledge of first-visit and every-visit methods',
      'Concept of policy evaluation',
      'Understanding of value function estimation',
      'Familiarity with episode generation'
    ],
    mcqs: [
      {
        id: 't13-1',
        question: 'What is the goal of Monte Carlo prediction?',
        options: [
          { id: 'a', text: 'To estimate the value function for a given policy using sampled episode returns' },
          { id: 'b', text: 'To find the optimal policy directly without evaluating values' },
          { id: 'c', text: 'To model the environment transition probabilities' },
          { id: 'd', text: 'To generate random episodes for data augmentation' }
        ],
        correctAnswer: 'a',
        justification: 'MC prediction (policy evaluation) estimates the value function V_pi(s) for a fixed policy pi by averaging returns from sampled episodes.',
        wrongJustifications: {
          b: 'Finding the optimal policy is MC control, not prediction.',
          c: 'MC methods do not model transition probabilities.',
          d: 'MC prediction uses episodes for evaluation, not random augmentation.'
        }
      },
      {
        id: 't13-2',
        question: 'In MC prediction why do we need to generate episodes under the policy being evaluated?',
        options: [
          { id: 'a', text: 'The episodes must follow the target policy to provide unbiased samples of returns under that policy' },
          { id: 'b', text: 'Any random episodes work equally well' },
          { id: 'c', text: 'Episodes under other policies give better estimates' },
          { id: 'd', text: 'The policy being evaluated is irrelevant to prediction' }
        ],
        correctAnswer: 'a',
        justification: 'To estimate V_pi(s), we need returns generated by following policy pi; otherwise, the samples would estimate a different policy value function.',
        wrongJustifications: {
          b: 'Episodes must follow the target policy for unbiased estimates.',
          c: 'Episodes from other policies estimate different value functions.',
          d: 'The policy determines the return distribution.'
        }
      },
      {
        id: 't13-3',
        question: 'How does MC prediction handle state values for states not visited in any episode?',
        options: [
          { id: 'a', text: 'Those states retain their initial value estimates (or default values)' },
          { id: 'b', text: 'They are automatically set to zero' },
          { id: 'c', text: 'They are estimated by interpolating from visited states' },
          { id: 'd', text: 'MC prediction cannot proceed if any state is unvisited' }
        ],
        correctAnswer: 'a',
        justification: 'States not visited retain their initial estimates. With sufficient exploration, all states will eventually be visited and their estimates updated.',
        wrongJustifications: {
          b: 'They keep their initial value, which may not be zero.',
          c: 'Basic MC does not interpolate; it only updates visited states.',
          d: 'MC can proceed with unvisited states having default values.'
        }
      },
      {
        id: 't13-4',
        question: 'What is the incremental update rule for first-visit MC prediction?',
        options: [
          { id: 'a', text: 'V(S_t) leftarrow V(S_t) + 1/N(S_t) [G_t - V(S_t)] where N(S_t) counts first visits' },
          { id: 'b', text: 'V(S_t) leftarrow G_t replacing the old estimate completely' },
          { id: 'c', text: 'V(S_t) leftarrow V(S_t) + alpha [R_{t+1} + gamma V(S_{t+1}) - V(S_t)]' },
          { id: 'd', text: 'V(S_t) leftarrow max(V(S_t) G_t)' }
        ],
        correctAnswer: 'a',
        justification: 'First-visit MC uses the incremental mean: updating toward G_t with step-size 1/N(S_t), the inverse of the first-visit count.',
        wrongJustifications: {
          b: 'Complete replacement would be unstable and discard all prior information.',
          c: 'This is the TD update rule, not MC.',
          d: 'Taking the maximum is not a valid estimation procedure.'
        }
      },
      {
        id: 't13-5',
        question: 'How many episodes are typically needed for MC prediction to produce accurate estimates?',
        options: [
          { id: 'a', text: 'It depends on the environment complexity and variance of returns; more episodes reduce variance' },
          { id: 'b', text: 'Exactly one episode is sufficient' },
          { id: 'c', text: 'At least 1000 episodes are always required' },
          { id: 'd', text: 'Episode count does not affect accuracy' }
        ],
        correctAnswer: 'a',
        justification: 'Convergence rate depends on return variance and environment complexity. More episodes improve estimates through the law of large numbers.',
        wrongJustifications: {
          b: 'Single episodes have high variance and may not visit all states.',
          c: 'Required episodes vary widely by problem.',
          d: 'More episodes generally improve accuracy.'
        }
      },
      {
        id: 't13-6',
        question: 'What is the relationship between MC prediction and the return G_t?',
        options: [
          { id: 'a', text: 'MC prediction uses G_t as the target for value estimation averaging multiple observed G_t values' },
          { id: 'b', text: 'MC prediction ignores G_t and uses only immediate rewards' },
          { id: 'c', text: 'G_t is only used in TD methods not MC' },
          { id: 'd', text: 'MC prediction sets V(s) = G_t for the most recent episode' }
        ],
        correctAnswer: 'a',
        justification: 'MC prediction averages G_t across episodes to estimate the expected return, which defines the value function.',
        wrongJustifications: {
          b: 'G_t is central to MC methods.',
          c: 'G_t is the core quantity in MC methods.',
          d: 'MC averages G_t across episodes rather than using the latest sample.'
        }
      },
      {
        id: 't13-7',
        question: 'In MC prediction what happens if we use a constant step-size alpha instead of 1/N?',
        options: [
          { id: 'a', text: 'It enables the method to track non-stationary environments by giving more weight to recent episodes' },
          { id: 'b', text: 'The method stops working entirely' },
          { id: 'c', text: 'Convergence becomes impossible' },
          { id: 'd', text: 'The estimates become identical to using 1/N' }
        ],
        correctAnswer: 'a',
        justification: 'Constant step-size gives exponentially decaying weight to past episodes, useful for non-stationary problems but introduces asymptotic bias.',
        wrongJustifications: {
          b: 'Constant step-size MC works and is commonly used.',
          c: 'It converges in expectation but has asymptotic bias.',
          d: 'The estimates differ: 1/N gives equal weight; constant alpha gives recency bias.'
        }
      },
      {
        id: 't13-8',
        question: 'How does MC prediction compare to dynamic programming for policy evaluation?',
        options: [
          { id: 'a', text: 'MC does not require a model but has higher variance; DP is model-based with no sampling variance' },
          { id: 'b', text: 'MC is always more accurate than DP' },
          { id: 'c', 'text': 'DP does not require episodes but MC does' },
          { id: 'd', text: 'Both a and c are correct' }
        ],
        correctAnswer: 'd',
        justification: 'MC is model-free with sampling variance; DP needs a model but computes exact values with no variance. MC requires episodes; DP uses the model directly.',
        wrongJustifications: {
          a: 'Partially correct but incomplete.',
          c: 'Partially correct but incomplete.',
          b: 'DP is exact given the model; MC has approximation error.'
        }
      },
      {
        id: 't13-9',
        question: 'What is the primary computational advantage of MC prediction over DP?',
        options: [
          { id: 'a', text: 'MC can evaluate a policy using only sample episodes without needing the full transition matrix' },
          { id: 'b', text: 'MC requires no computation at all' },
          { id: 'c', text: 'MC always converges in fewer iterations' },
          { id: 'd', text: 'MC does not require storing any values' }
        ],
        correctAnswer: 'a',
        justification: 'MC works with sampled episodes, avoiding the need to know or store the full environment transition model.',
        wrongJustifications: {
          b: 'MC still requires computation for averaging returns.',
          c: 'MC may need many episodes; DP can converge quickly with a model.',
          d: 'MC must store and update value estimates.'
        }
      },
      {
        id: 't13-10',
        question: 'In MC prediction why might focusing on states of interest be more efficient than evaluating all states?',
        options: [
          { id: 'a', text: 'Episodes naturally start from or visit certain states more often, and we can focus computational resources on those states' },
          { id: 'b', text: 'Uninteresting states do not affect the value function' },
          { id: 'c', text: 'MC cannot evaluate all states in any environment' },
          { id: 'd', text: 'Focusing on certain states violates the prediction objective' }
        ],
        correctAnswer: 'a',
        justification: 'MC naturally focuses computation on states that are actually visited; unlike DP which must sweep all states, MC allocates effort proportionally to visit frequency.',
        wrongJustifications: {
          b: 'All states contribute to the value function, but some may be more relevant.',
          c: 'MC can evaluate all states given enough exploration.',
          d: 'Focusing on visited states is a natural consequence of on-policy sampling.'
        }
      }
    ],
    recap: [
      'MC prediction estimates the value function for a given policy by averaging episode returns.',
      'Episodes must follow the target policy to produce unbiased value estimates.',
      'Unvisited states retain their initial values until visited.',
      'First-visit MC prediction uses incremental mean update with step-size 1/N(S_t).',
      'More episodes improve accuracy through the law of large numbers.',
      'Constant step-size allows tracking non-stationary environments.',
      'MC is model-free but has higher variance than dynamic programming.',
      'MC focuses computation on states actually visited during episodes.'
    ],
    skillMapping: [
      { skill: 'Understanding MC Prediction for Policy Evaluation', level: 'intermediate' },
      { skill: 'Implementing Incremental MC Value Updates', level: 'intermediate' },
      { skill: 'Comparing MC Prediction with Dynamic Programming', level: 'advanced' },
      { skill: 'Analyzing Step-Size Choices in MC', level: 'advanced' }
    ]
  },
  Topic14_MCControl: {
    prerequisites: [
      'MC prediction understanding',
      'Knowledge of policy improvement',
      'Concept of generalized policy iteration',
      'Understanding of action-value functions',
      'Familiarity with exploration in RL'
    ],
    mcqs: [
      {
        id: 't14-1',
        question: 'What is the goal of Monte Carlo control?',
        options: [
          { id: 'a', text: 'To find the optimal policy by alternating between policy evaluation and policy improvement' },
          { id: 'b', text: 'To evaluate a fixed policy without improving it' },
          { id: 'c', text: 'To model the environment transition probabilities' },
          { id: 'd', text: 'To generate random training data' }
        ],
        correctAnswer: 'a',
        justification: 'MC control uses generalized policy iteration: evaluating the current policy and improving it, converging to the optimal policy.',
        wrongJustifications: {
          b: 'Evaluating a fixed policy is prediction, not control.',
          c: 'MC control does not require a model.',
          d: 'MC control aims to find optimal behavior, not generate data.'
        }
      },
      {
        id: 't14-2',
        question: 'Why does MC control need action-value functions rather than state-value functions?',
        options: [
          { id: 'a', text: 'Without a model state values alone cannot determine which action is best since transition probabilities are unknown' },
          { id: 'b', text: 'Action-value functions require less computation' },
          { id: 'c', text: 'State-value functions are never used in RL' },
          { id: 'd', text: 'Action-value functions are only needed for off-policy methods' }
        ],
        correctAnswer: 'a',
        justification: 'In model-free control, we need Q(s,a) to compare actions; V(s) alone cannot determine the best action without knowing the environment dynamics.',
        wrongJustifications: {
          b: 'Action-value functions require more storage.',
          c: 'State-value functions are used in many RL methods.',
          d: 'Action-value functions are essential for both on-policy and off-policy methods.'
        }
      },
      {
        id: 't14-3',
        question: 'How does generalized policy iteration (GPI) work in MC control?',
        options: [
          { id: 'a', text: 'It alternates between evaluating the current policy and making it greedy with respect to the current value function' },
          { id: 'b', text: 'It only evaluates the policy once and keeps it fixed' },
          { id: 'c', text: 'It randomly changes the policy without evaluation' },
          { id: 'd', text: 'It skips policy improvement entirely' }
        ],
        correctAnswer: 'a',
        justification: 'GPI alternates between policy evaluation (estimate Q values) and policy improvement (update policy to be greedy with respect to Q).',
        wrongJustifications: {
          b: 'Control requires both evaluation and improvement.',
          c: 'Improvement should be based on evaluation.',
          d: 'Both evaluation and improvement are needed.'
        }
      },
      {
        id: 't14-4',
        question: 'What is the main challenge in MC control with greedy policy improvement?',
        options: [
          { id: 'a', text: 'Greedy improvement may eliminate exploration causing the agent to miss better actions' },
          { id: 'b', text: 'Greedy policies are always worse than stochastic policies' },
          { id: 'c', text: 'Greedy improvement requires a model' },
          { id: 'd', text: 'Greedy policies cannot be computed from action values' }
        ],
        correctAnswer: 'a',
        justification: 'Making the policy greedy with respect to current Q stops exploring non-greedy actions, which may be suboptimal if those actions are actually better.',
        wrongJustifications: {
          b: 'Greedy policies can be optimal.',
          c: 'Greedy improvement is model-free.',
          d: 'Greedy policies are directly computed from Q values.'
        }
      },
      {
        id: 't14-5',
        question: 'How does on-policy MC control ensure continued exploration?',
        options: [
          { id: 'a', text: 'By using a soft policy like epsilon-soft that maintains a non-zero probability for all actions' },
          { id: 'b', text: 'By occasionally turning off the learning algorithm' },
          { id: 'c', text: 'By using a purely deterministic policy' },
          { id: 'd', text: 'By randomly resetting the Q values' }
        ],
        correctAnswer: 'a',
        justification: 'On-policy MC control uses soft policies (e.g., epsilon-soft) that ensure all actions have non-zero probability, maintaining exploration.',
        wrongJustifications: {
          b: 'Turning off learning does not ensure exploration.',
          c: 'Deterministic policies eliminate exploration.',
          d: 'Resetting Q values wastes learned information.'
        }
      },
      {
        id: 't14-6',
        question: 'In MC control what is the policy improvement step for on-policy methods?',
        options: [
          { id: 'a', text: 'Update the policy to be epsilon-greedy with respect to the current Q values' },
          { id: 'b', text: 'Make the policy uniformly random' },
          { id: 'c', text: 'Set the policy to always choose the worst action' },
          { id: 'd', text: 'Randomly shuffle action probabilities' }
        ],
        correctAnswer: 'a',
        justification: 'On-policy MC control updates to an epsilon-greedy policy, which selects the greedy action with probability 1-epsilon and random actions with probability epsilon.',
        wrongJustifications: {
          b: 'Uniformly random policy would not improve.',
          c: 'Choosing worst actions is anti-learning.',
          d: 'Shuffling probabilities is not improvement.'
        }
      },
      {
        id: 't14-7',
        question: 'How does off-policy MC control differ from on-policy MC control?',
        options: [
          { id: 'a', text: 'Off-policy learns about an optimal target policy while following a different behavior policy for exploration' },
          { id: 'b', text: 'Off-policy does not use episodes' },
          { id: 'c', text: 'On-policy learns from other agents' },
          { id: 'd', text: 'There is no difference between them' }
        ],
        correctAnswer: 'a',
        justification: 'Off-policy methods separate behavior (for exploration) from target (optimal) policy, often using importance sampling to correct for the mismatch.',
        wrongJustifications: {
          b: 'Off-policy still uses episodes.',
          c: 'On-policy learns from its own experience.',
          d: 'They differ in how exploration is handled.'
        }
      },
      {
        id: 't14-8',
        question: 'What role does importance sampling play in off-policy MC control?',
        options: [
          { id: 'a', text: 'It weights returns from the behavior policy to estimate what would happen under the target policy' },
          { id: 'b', text: 'It selects which actions are most important' },
          { id: 'c', text: 'It reduces the number of episodes needed' },
          { id: 'd', text: 'It eliminates the need for exploration' }
        ],
        correctAnswer: 'a',
        justification: 'Importance sampling corrects the distribution mismatch between behavior and target policies by weighting returns by the ratio of probabilities.',
        wrongJustifications: {
          b: 'Importance sampling corrects distribution mismatch.',
          c: 'Importance sampling often increases variance.',
          d: 'Exploration is still needed for off-policy methods.'
        }
      },
      {
        id: 't14-9',
        question: 'What is a key disadvantage of importance sampling in off-policy MC?',
        options: [
          { id: 'a', text: 'It can have very high variance especially with long episodes because the importance sampling ratio is a product of many probabilities' },
          { id: 'b', text: 'It makes the algorithm run slower' },
          { id: 'c', text: 'It requires a model of the environment' },
          { id: 'd', text: 'It only works for continuous state spaces' }
        ],
        correctAnswer: 'a',
        justification: 'The importance sampling ratio multiplies probabilities over many steps, potentially leading to extremely large or small weights and very high variance.',
        wrongJustifications: {
          b: 'Variance is the main concern, not computational speed.',
          c: 'Importance sampling is model-free.',
          d: 'It works for both discrete and continuous spaces.'
        }
      },
      {
        id: 't14-10',
        question: 'Why does MC control typically converge to the optimal policy given sufficient exploration?',
        options: [
          { id: 'a', text: 'Generalized policy iteration guarantees convergence when each policy is evaluated sufficiently and improved' },
          { id: 'b', text: 'MC control uses a brute-force search over all policies' },
          { id: 'c', text: 'Convergence is guaranteed only for deterministic environments' },
          { id: 'd', text: 'MC control does not actually converge to optimal policies' }
        ],
        correctAnswer: 'a',
        justification: 'GPI theory shows that alternating between evaluation and improvement converges to the optimal policy, provided each policy is evaluated enough before improvement.',
        wrongJustifications: {
          b: 'GPI is not brute-force; it iteratively improves.',
          c: 'Convergence holds for stochastic environments as well.',
          d: 'MC control converges under standard assumptions.'
        }
      }
    ],
    recap: [
      'MC control finds the optimal policy through generalized policy iteration.',
      'MC control requires action-value functions since no model is available.',
      'GPI alternates between policy evaluation and greedy policy improvement.',
      'Greedy improvement can stop exploration, requiring soft policies.',
      'On-policy MC uses epsilon-soft policies to maintain exploration.',
      'Off-policy MC separates behavior policy from target policy.',
      'Importance sampling corrects distribution mismatch in off-policy learning.',
      'Importance sampling can introduce high variance in long episodes.'
    ],
    skillMapping: [
      { skill: 'Understanding Monte Carlo Control with GPI', level: 'intermediate' },
      { skill: 'Differentiating On-Policy vs. Off-Policy MC Control', level: 'intermediate' },
      { skill: 'Applying Epsilon-Soft Policies for Exploration', level: 'intermediate' },
      { skill: 'Analyzing Importance Sampling in Off-Policy MC', level: 'advanced' }
    ]
  },
  Topic15_EpsilonGreedy: {
    prerequisites: [
      'Monte Carlo control concepts',
      'Understanding of exploration-exploitation trade-off',
      'Knowledge of action selection methods',
      'Familiarity with multi-armed bandits',
      'Concept of greedy and epsilon-soft policies'
    ],
    mcqs: [
      {
        id: 't15-1',
        question: 'What is the epsilon-greedy action selection method?',
        options: [
          { id: 'a', text: 'With probability 1-epsilon select the greedy action; with probability epsilon select a random action uniformly' },
          { id: 'b', text: 'Always select the action with the highest Q-value' },
          { id: 'c', text: 'Always select a random action' },
          { id: 'd', text: 'Select actions based on their probability proportional to Q-values' }
        ],
        correctAnswer: 'a',
        justification: 'Epsilon-greedy balances exploration and exploitation: mostly exploit (greedy) but occasionally explore (random) with probability epsilon.',
        wrongJustifications: {
          b: 'Always greedy is pure exploitation with no exploration.',
          c: 'Always random is pure exploration with no exploitation.',
          d: 'Probability proportional to Q-values describes softmax/Boltzmann exploration.'
        }
      },
      {
        id: 't15-2',
        question: 'How does epsilon affect the exploration-exploitation balance?',
        options: [
          { id: 'a', text: 'Higher epsilon means more exploration; lower epsilon means more exploitation' },
          { id: 'b', text: 'Higher epsilon means more exploitation' },
          { id: 'c', text: 'Epsilon has no effect on the balance' },
          { id: 'd', text: 'Epsilon only affects exploitation not exploration' }
        ],
        correctAnswer: 'a',
        justification: 'Epsilon directly controls exploration frequency: a higher epsilon increases random action probability (more exploration), while lower epsilon favors greedy actions (more exploitation).',
        wrongJustifications: {
          b: 'Higher epsilon increases exploration, not exploitation.',
          c: 'Epsilon is the key parameter controlling the trade-off.',
          d: 'Epsilon determines the split between exploration and exploitation.'
        }
      },
      {
        id: 't15-3',
        question: 'What happens when epsilon = 0 in epsilon-greedy?',
        options: [
          { id: 'a', text: 'The agent always selects the greedy action and never explores' },
          { id: 'b', text: 'The agent always explores randomly' },
          { id: 'c', text: 'The agent stops learning entirely' },
          { id: 'd', text: 'The agent uses a completely random policy' }
        ],
        correctAnswer: 'a',
        justification: 'With epsilon = 0, the agent always selects the action with the highest estimated value, resulting in pure exploitation with no exploration.',
        wrongJustifications: {
          b: 'Epsilon = 1 would give pure random exploration.',
          c: 'Learning can still happen from visited states.',
          d: 'Epsilon = 1 gives a random policy.'
        }
      },
      {
        id: 't15-4',
        question: 'What is the advantage of decaying epsilon over time?',
        options: [
          { id: 'a', text: 'It allows high exploration early when the agent knows little and more exploitation later as knowledge improves' },
          { id: 'b', text: 'It makes the agent always explore more' },
          { id: 'c', text: 'It prevents any learning from occurring' },
          { id: 'd', text: 'Decaying epsilon has no effect on performance' }
        ],
        correctAnswer: 'a',
        justification: 'Decaying epsilon is intuitive: explore more initially to gather information, then exploit more as the agent becomes more confident in its value estimates.',
        wrongJustifications: {
          b: 'Decaying epsilon reduces exploration over time.',
          c: 'Decaying epsilon supports effective learning.',
          d: 'Decaying epsilon significantly affects learning dynamics.'
        }
      },
      {
        id: 't15-5',
        question: 'How does epsilon-greedy compare to softmax (Boltzmann) exploration?',
        options: [
          { id: 'a', text: 'Epsilon-greedy selects among all non-greedy actions uniformly; softmax weights by Q-value estimates' },
          { id: 'b', text: 'Epsilon-greedy is always better than softmax' },
          { id: 'c', text: 'Softmax does not use Q-values' },
          { id: 'd', text: 'Both methods are identical in behavior' }
        ],
        correctAnswer: 'a',
        justification: 'Epsilon-greedy treats all non-greedy actions equally; softmax assigns higher probability to better actions even during exploration.',
        wrongJustifications: {
          b: 'Neither is universally better; they have different properties.',
          c: 'Softmax uses Q-values for probability weighting.',
          d: 'They differ in how exploration actions are selected.'
        }
      },
      {
        id: 't15-6',
        question: 'In a k-armed bandit problem what is the expected regret of epsilon-greedy?',
        options: [
          { id: 'a', text: 'Regret grows linearly but with a slope that decreases with more data as the optimal action is identified' },
          { id: 'b', text: 'Regret is always zero' },
          { id: 'c', text: 'Regret grows exponentially' },
          { id: 'd', text: 'Epsilon-greedy has no regret' }
        ],
        correctAnswer: 'a',
        justification: 'Epsilon-greedy suffers linear regret because it continues exploring with probability epsilon indefinitely, but the slope decreases as the greedy action becomes optimal.',
        wrongJustifications: {
          b: 'All exploration strategies incur some regret.',
          c: 'Regret is linear, not exponential.',
          d: 'Epsilon-greedy incurs regret from both exploration and suboptimal exploitation.'
        }
      },
      {
        id: 't15-7',
        question: 'Why is epsilon-greedy popular in practice despite having linear regret?',
        options: [
          { id: 'a', text: 'It is simple to implement computationally efficient and works well in many practical problems with finite time horizons' },
          { id: 'b', text: 'It has zero regret in practice' },
          { id: 'c', text: 'It is the only exploration method available' },
          { id: 'd', text: 'It requires no parameter tuning' }
        ],
        correctAnswer: 'a',
        justification: 'Epsilon-greedy is simple, requires minimal computation, and is effective for many real-world problems where constant exploration is acceptable.',
        wrongJustifications: {
          b: 'Epsilon-greedy has linear regret.',
          c: 'Many exploration methods exist (UCB, Thompson sampling, etc.).',
          d: 'Epsilon requires tuning for good performance.'
        }
      },
      {
        id: 't15-8',
        question: 'How does epsilon-greedy behave in non-stationary environments?',
        options: [
          { id: 'a', text: 'The constant exploration helps detect changes but a fixed epsilon may not adapt optimally if the environment changes rate varies' },
          { id: 'b', text: 'Epsilon-greedy stops exploring after the first episode' },
          { id: 'c', text: 'Non-stationary environments require epsilon = 0' },
          { id: 'd', text: 'Epsilon-greedy cannot handle non-stationary environments at all' }
        ],
        correctAnswer: 'a',
        justification: 'The constant exploration in epsilon-greedy is beneficial for non-stationary environments because the agent can discover changes, but the fixed epsilon may not be optimal.',
        wrongJustifications: {
          b: 'Epsilon-greedy explores with probability epsilon every step.',
          c: 'Epsilon = 0 would prevent detecting changes.',
          d: 'Epsilon-greedy can handle non-stationary environments with constant exploration.'
        }
      },
      {
        id: 't15-9',
        question: 'How does using epsilon-greedy in MC control affect the policies learned?',
        options: [
          { id: 'a', text: 'It ensures the learned policy is near-optimal since the agent still explores while converging toward the best actions' },
          { id: 'b', text: 'It prevents convergence to any policy' },
          { id: 'c', text: 'It always learns the worst possible policy' },
          { id: 'd', text: 'Epsilon-greedy is not used in MC control' }
        ],
        correctAnswer: 'a',
        justification: 'Epsilon-greedy MC control converges to the optimal epsilon-soft policy, which is close to the true optimal policy for small epsilon.',
        wrongJustifications: {
          b: 'It converges to the optimal epsilon-soft policy.',
          c: 'It learns near-optimal policies.',
          d: 'Epsilon-greedy is a standard method in MC control.'
        }
      },
      {
        id: 't15-10',
        question: 'What is the relationship between epsilon and the optimal epsilon-soft policy?',
        options: [
          { id: 'a', text: 'The optimal epsilon-soft policy chooses the best action with probability 1-epsilon and all others equally with probability epsilon/(k-1)' },
          { id: 'b', text: 'The optimal epsilon-soft policy ignores all Q-values' },
          { id: 'c', text: 'Epsilon limits how close the policy can get to the true optimal deterministic policy' },
          { id: 'd', text: 'Both a and c are correct' }
        ],
        correctAnswer: 'd',
        justification: 'The optimal epsilon-soft policy balances exploration and exploitation as described, and epsilon creates a gap between the learned policy and the true optimal policy.',
        wrongJustifications: {
          a: 'Partially correct but incomplete.',
          c: 'Partially correct but incomplete.',
          b: 'It uses Q-values to determine the best action.'
        }
      }
    ],
    recap: [
      'Epsilon-greedy selects greedy action with prob 1-epsilon and random action with prob epsilon.',
      'Higher epsilon increases exploration; lower epsilon increases exploitation.',
      'Decaying epsilon balances early exploration with later exploitation.',
      'Epsilon-greedy treats all non-greedy actions equally unlike softmax exploration.',
      'Epsilon-greedy has linear regret but is simple and effective in practice.',
      'Constant exploration in epsilon-greedy helps in non-stationary environments.',
      'MC control uses epsilon-greedy to learn near-optimal policies.',
      'Epsilon creates a gap between the learned epsilon-soft policy and the true optimal policy.'
    ],
    skillMapping: [
      { skill: 'Understanding Epsilon-Greedy Action Selection', level: 'beginner' },
      { skill: 'Comparing Epsilon-Greedy with Other Exploration Methods', level: 'intermediate' },
      { skill: 'Implementing Decaying Epsilon Strategies', level: 'intermediate' },
      { skill: 'Analyzing Regret in Epsilon-Greedy Methods', level: 'advanced' }
    ]
  }
};
