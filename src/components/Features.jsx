import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Home,
  Target,
  CheckSquare,
  StickyNote,
  FileText,
  Bell,
  Clock,
  Video,
  Mail,
  Send,
  DollarSign,
  BarChart3,
  MessageCircle,
  Settings,
  HelpCircle
} from 'lucide-react';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Home,
      title: 'Dashboard Overview',
      description: 'Get a complete snapshot of your tasks, goals, and productivity in one place.',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Set and track personal or team goals with measurable progress indicators.',
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: CheckSquare,
      title: 'Task Management',
      description: 'Manage daily tasks with checklists, deadlines, and Kanban boards.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: StickyNote,
      title: 'Smart Notes',
      description: 'Capture thoughts and ideas in structured, searchable notes.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: FileText,
      title: 'Proposal Builder',
      description: 'Create, edit, and send professional proposals to clients with ease.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Bell,
      title: 'Reminders',
      description: 'Stay on top of deadlines with smart reminders and recurring alerts.',
      color: 'from-rose-500 to-red-500',
    },
    {
      icon: Clock,
      title: 'Pomodoro Timer',
      description: 'Boost focus and productivity using the built-in Pomodoro timer.',
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: Video,
      title: 'YouTube Script Assistant',
      description: 'Generate SEO-friendly video scripts with AI-powered prompts.',
      color: 'from-pink-500 to-fuchsia-500',
    },
    {
      icon: Mail,
      title: 'Unified Inbox',
      description: 'Handle all your business emails from one clean, integrated space.',
      color: 'from-indigo-500 to-violet-500',
    },
    {
      icon: Send,
      title: 'Cold Email Automation',
      description: 'Automate outreach with warm-up and AI-personalized cold emails.',
      color: 'from-blue-500 to-sky-500',
    },
    {
      icon: DollarSign,
      title: 'Finance Tracking',
      description: 'Track income, expenses, and generate invoices easily.',
      color: 'from-emerald-500 to-green-500',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Gain deep insights into your performance with detailed reports.',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: MessageCircle,
      title: 'AI-Powered Chat',
      description: 'Collaborate with your team or AI assistant inside your workspace.',
      color: 'from-slate-500 to-gray-700',
    },
    {
      icon: Settings,
      title: 'Custom Settings',
      description: 'Personalize your workspace layout, preferences, and themes.',
      color: 'from-gray-500 to-gray-800',
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Access guides, tutorials, and contact support anytime.',
      color: 'from-red-400 to-pink-400',
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="features" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            Everything you need.
            <br />
            <span className="bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent">
              Nothing you don't.
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light"
          >
            A comprehensive suite of productivity tools designed to help you work smarter, not harder.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group glass-effect rounded-3xl p-8 card-hover"
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon size={28} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-apple-blue dark:group-hover:text-apple-blue transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-10 py-4"
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;