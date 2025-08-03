import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Download, ArrowRight, Sparkles } from 'lucide-react';

const ThankYou = () => {
  const [userEmail, setUserEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  useEffect(() => {
    // Get email from URL parameters or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email') || localStorage.getItem('userEmail') || '';
    setUserEmail(email);

    // Send confirmation email
    if (email) {
      sendConfirmationEmail(email);
    }
  }, []);

  const sendConfirmationEmail = async (email) => {
    try {
      // TODO: Replace with actual email service integration
      // Example: EmailJS, Formspree, or your backend API
      console.log('Sending confirmation email to:', email);
      console.log('Admin notification sent to: c.madushankaofficial@gmail.com');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEmailSent(true);
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  };

  const nextSteps = [
    {
      icon: Mail,
      title: 'Check Your Email',
      description: 'We\'ve sent your login credentials and getting started guide.',
      action: 'Open Email App'
    },
    {
      icon: Download,
      title: 'Download Apps',
      description: 'Get our mobile and desktop apps for the best experience.',
      action: 'Download Now'
    },
    {
      icon: Sparkles,
      title: 'Start Your Journey',
      description: 'Begin with our interactive onboarding and tutorials.',
      action: 'Get Started'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <div className="min-h-screen bg-gradient-to-br from-white via-apple-gray-6 to-apple-gray-5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-apple-blue/10 to-apple-green/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-apple-purple/10 to-apple-blue/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Success Icon */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-apple-green to-green-500 rounded-full shadow-2xl mb-6">
            <CheckCircle size={48} className="text-white" />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight"
        >
          Welcome to
          <br />
          <span className="bg-gradient-to-r from-apple-blue via-apple-purple to-apple-green bg-clip-text text-transparent">
            ProductivePro!
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Thank you for choosing ProductivePro. Your productivity journey starts now!
        </motion.p>

        {/* Email Confirmation Status */}
        {userEmail && (
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 bg-apple-green/10 dark:bg-apple-green/20 border border-apple-green/20 text-apple-green px-6 py-3 rounded-full text-sm font-medium mb-12 shadow-lg"
          >
            <Mail size={16} />
            <span>
              {isEmailSent 
                ? `Confirmation sent to ${userEmail}` 
                : `Sending confirmation to ${userEmail}...`
              }
            </span>
          </motion.div>
        )}

        {/* Next Steps */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {nextSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="glass-effect rounded-3xl p-8 card-hover"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-apple-blue to-apple-purple mb-6 shadow-lg">
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light mb-6">
                  {step.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center space-x-2 mx-auto"
                >
                  <span>{step.action}</span>
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main CTA */}
        <motion.div
          variants={itemVariants}
          className="space-y-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/dashboard'}
            className="btn-primary text-lg px-12 py-4 mr-4"
          >
            Access Your Dashboard
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/'}
            className="btn-secondary text-lg px-12 py-4"
          >
            Back to Home
          </motion.button>
        </motion.div>

        {/* Support Info */}
        <motion.div
          variants={itemVariants}
          className="mt-16 glass-effect rounded-2xl p-6 max-w-2xl mx-auto"
        >
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Need Help Getting Started?
          </h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4 font-light">
            Our support team is here to help you make the most of ProductivePro.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <span>📧 c.madushankaofficial@gmail.com</span>
            <span>📞 24/7 Support Available</span>
            <span>💬 Live Chat Ready</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ThankYou;