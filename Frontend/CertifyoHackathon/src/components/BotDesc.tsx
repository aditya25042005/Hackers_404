
import { motion } from 'framer-motion'

const benefits = [
  {
    title: "Financial Stability",
    desc: "A great career ensures a steady income, empowering you to live comfortably and plan for your future.",
    icon: "💰",
  },
  {
    title: "Personal Growth",
    desc: "Challenging roles help you learn new skills, build confidence, and achieve your potential.",
    icon: "🌱",
  },
  {
    title: "Job Satisfaction",
    desc: "A fulfilling career aligns with your passion, making your daily work meaningful and motivating.",
    icon: "😊",
  },
  {
    title: "Future Security",
    desc: "Choosing the right career path helps you stay adaptable in an ever-changing job market.",
    icon: "🔒",
  },
]

const BotDesc: React.FC = () => {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto text-white">
      {/* Intro Section */}
      <motion.div
        id="intro"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-black">Empowering Students. Guiding Futures.</h1>
        <p className="text-lg leading-relaxed text-gray-900">
          The AI Career Counselor Bot is a smart virtual counselor created to transform the process of career decision-making for students and job seekers. Driven by state-of-the-art AI, the bot is a 24/7 personal career mentor that offers customized advice, responds to career queries, and suggests appropriate career streams based on strengths, interests, and educational qualifications.
          <br /><br />
          Whether you are lost between design and engineering, uncertain about courses, or just interested in the trends of jobs in the future, the bot is here to assist you—straightaway and instinctively.
        </p>
      </motion.div>

      {/* Benefits Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {benefits.map(({ title, desc, icon }, i) => (
          <div
            key={i}
            style={{ backgroundColor: '#EFEFEF' }}
            className="bg-opacity-80 rounded-lg p-6 shadow-lg flex flex-col items-start space-y-3 hover:bg-red-700 transition"
          >
            <div className="text-4xl">{icon}</div>
            <h3 className="text-xl text-red-600 font-semibold">{title}</h3>
            <p className="text-black">{desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Key Features */}
      <motion.div
        className="keyFeatures mb-12"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-black">Key Features</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-900 text-lg">
          <li> Personalized Career Suggestions based on user input and preferences.</li>
          <li> AI-Powered Q&A to answer queries about fields, courses, and career scopes.</li>
          <li> Data-Driven Insights into trending career options and required skills.</li>
          <li> Conversational Interface for natural and engaging interactions.</li>
          <li> Resource Recommendations including online courses, articles, and more.</li>
        </ul>
      </motion.div>

      {/* Outro Section */}
      <motion.div
        className="outro"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-black">Why it matters</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          In a world full of options, finding the correct career choice can be daunting. Our AI Career Counselor Bot makes it easy by providing data-driven, unbiased, and accessible career guidance—anywhere, anytime.
        </p>
        <h3 className="text-xl italic text-orange-400">
          "Don't just choose a career—build a future with confidence."
        </h3>
      </motion.div>
    </div>
  )
}

export default BotDesc
