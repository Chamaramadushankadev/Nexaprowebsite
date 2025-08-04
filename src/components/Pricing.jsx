import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Star, Zap, Crown, Users } from 'lucide-react';

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // monthly, yearly, lifetime

  // Placeholder Stripe checkout function
  const handleStripeCheckout = (planName, priceId, price) => {
    console.log(`Initiating Stripe checkout for ${planName} with price ID: ${priceId}`);
    
    // TODO: Replace with actual Stripe integration
    // const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    // const { error } = await stripe.redirectToCheckout({
    //   lineItems: [{ price: priceId, quantity: 1 }],
    //   mode: price === 0 ? 'setup' : 'subscription',
    //   successUrl: `${window.location.origin}/thank-you?email={CHECKOUT_SESSION_CUSTOMER_EMAIL}`,
    //   cancelUrl: `${window.location.origin}/cancel`,
    // });
    
    // For demo purposes, redirect to thank you page
    const demoEmail = 'demo@example.com';
    localStorage.setItem('userEmail', demoEmail);
    window.location.href = `/thank-you?email=${demoEmail}`;
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'For individuals just starting out',
      price: {
        monthly: 0,
        yearly: 0,
        lifetime: 0
      },
      features: [
        '5 Goals',
        '5 Tasks',
        '5 Notes',
        '5 Proposals',
        '5 Reminders',
        'Pomodoro Timer',
        '5 YouTube Scripts',
        '1 Team Member',
        'Community Support'
      ],
      buttonText: 'Get Started Free',
      popular: false,
      icon: Users,
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'starter',
      name: 'Starter',
      description: 'For solo professionals',
      price: {
        monthly: 4.99,
        yearly: 49.99,
        lifetime: 99.99
      },
      features: [
        'Unlimited Goals',
        'Unlimited Tasks',
        'Unlimited Notes',
        'Unlimited Proposals',
        'Unlimited Reminders',
        'Pomodoro Timer',
        'Time tracker',
        '2 Team Members',
        'Email Support',
        'Chat with Team Members & Channels'
      ],
      buttonText: 'Start Free Trial',
      popular: true,
      icon: Star,
      color: 'from-apple-blue to-blue-600'
    },
    {
      id: 'creator',
      name: 'Creator',
      description: 'For creators and small teams',
      price: {
        monthly: 14.99,
        yearly: 119.99,
        lifetime: 239.98
      },
      features: [
        'Everything in Starter',
        '5 Team Members',
        'Script Generator (Advanced AI)',
        'Inspiration Board (save images & videos)',
        'Social Template Creation (basic Canva-like editor)',
        'Finance Management Tools',
        'Priority Support'
      ],
      buttonText: 'Get Started',
      popular: false,
      icon: Crown,
      color: 'from-apple-purple to-purple-600'
    },
    {
      id: 'business',
      name: 'Business',
      description: 'For growing marketing teams',
      price: {
        monthly: 29.99,
        yearly: 189.99,
        lifetime: null // No lifetime option for Business
      },
      features: [
        'Everything in Creator',
        'Unlimited Team Members',
        'Email Campaigns (10 Email Accounts)',
        'Unlimited Email Warmups',
        'Advanced Social Templates',
        'Analytics Dashboard',
        'Dedicated Support'
      ],
      buttonText: 'Contact Sales',
      popular: false,
      icon: Zap,
      color: 'from-apple-green to-green-600'
    }
  ];

  const getCurrentPrice = (plan) => {
    return plan.price[billingPeriod] || 0;
  };

  const getCurrentPriceId = (plan) => {
    return `price_${plan.id}_${billingPeriod}`;
  };

  const getPeriodText = () => {
    if (billingPeriod === 'lifetime') return 'one-time';
    return billingPeriod === 'yearly' ? '/year' : '/month';
  };

  const getYearlySavings = (plan) => {
    if (!plan.price.monthly || !plan.price.yearly) return 0;
    return (plan.price.monthly * 12) - plan.price.yearly;
  };

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
    <section id="pricing" className="section-padding bg-apple-gray-6 dark:bg-gray-800">
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
            Simple pricing.
            <br />
            <span className="bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent">
              Powerful results.
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 font-light"
          >
            Choose the perfect plan for your needs. Start free, upgrade anytime.
          </motion.p>
          
          {/* Billing Toggle */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center glass-effect rounded-full p-1 relative"
          >
            <button 
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 relative z-10 ${
                billingPeriod === 'monthly'
                  ? 'text-white bg-apple-blue shadow-lg' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-apple-blue'
              }`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 relative z-10 ${
                billingPeriod === 'yearly'
                  ? 'text-white bg-apple-blue shadow-lg' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-apple-blue'
              }`}
            >
              <span>Yearly</span>
              <span className="ml-1 text-xs bg-apple-green text-white px-2 py-1 rounded-full">
                Save up to 60%
              </span>
            </button>
            <button 
              onClick={() => setBillingPeriod('lifetime')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 relative z-10 ${
                billingPeriod === 'lifetime'
                  ? 'text-white bg-apple-blue shadow-lg' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-apple-blue'
              }`}
            >
              <span>Lifetime</span>
              <span className="ml-1 text-xs bg-apple-orange text-white px-2 py-1 rounded-full">
                Best Value
              </span>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const currentPrice = getCurrentPrice(plan);
            const isLifetimeAvailable = plan.price.lifetime !== null;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className={`relative glass-effect rounded-3xl p-6 transition-all duration-300 ${
                  plan.popular 
                    ? 'ring-2 ring-apple-blue shadow-2xl scale-105' 
                    : 'hover:shadow-xl'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-apple-blue to-apple-purple text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1 shadow-lg">
                      <Star size={14} />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r ${plan.color} mb-4 shadow-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 font-light text-sm">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    {currentPrice === 0 ? (
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        Free
                      </span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          ${currentPrice}
                        </span>
                        <span className="text-lg text-gray-600 dark:text-gray-300 ml-1 font-light">
                          {getPeriodText()}
                        </span>
                      </>
                    )}
                  </div>
                  {billingPeriod === 'yearly' && getYearlySavings(plan) > 0 && (
                    <div className="text-sm text-apple-green mt-2">
                      Save ${getYearlySavings(plan)} per year
                    </div>
                  )}
                  {billingPeriod === 'lifetime' && !isLifetimeAvailable && (
                    <div className="text-sm text-gray-500 mt-2">
                      Lifetime not available
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Check size={16} className="text-apple-green" />
                      </div>
                      <span className="text-gray-600 dark:text-gray-300 font-light text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  onClick={() => {
                    if (billingPeriod === 'lifetime' && !isLifetimeAvailable) {
                      alert('Lifetime plan not available for this tier. Please select monthly or yearly billing.');
                      return;
                    }
                    handleStripeCheckout(plan.name, getCurrentPriceId(plan), currentPrice);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={billingPeriod === 'lifetime' && !isLifetimeAvailable}
                  className={`w-full py-3 px-6 rounded-full font-medium transition-all duration-300 text-sm ${
                    plan.popular
                      ? 'bg-apple-blue hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
                      : billingPeriod === 'lifetime' && !isLifetimeAvailable
                      ? 'glass-effect text-gray-400 cursor-not-allowed opacity-50'
                      : 'glass-effect hover:bg-white/10 text-gray-900 dark:text-white border border-white/20 dark:border-gray-700/50'
                  }`}
                >
                  {plan.name === 'Business' ? (
                    <div className="flex items-center justify-center space-x-2">
                      <span>{plan.buttonText}</span>
                      <Zap size={16} />
                    </div>
                  ) : (
                    plan.buttonText
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Business Pro Add-on */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="glass-effect rounded-3xl p-6 border-2 border-apple-orange/20">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-apple-orange to-orange-600 mb-4 shadow-lg">
                <Zap size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Business Pro Add-on
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 font-light">
                For high-volume outreach
              </p>
              <div className="flex items-baseline justify-center mb-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${billingPeriod === 'yearly' ? '30' : '3'}
                </span>
                <span className="text-lg text-gray-600 dark:text-gray-300 ml-1 font-light">
                  {billingPeriod === 'yearly' ? '/year' : '/month'}
                </span>
              </div>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center justify-center space-x-2">
                  <Check size={14} className="text-apple-green" />
                  <span className="text-gray-600 dark:text-gray-300">Adds extra email account to your Business plan</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <Check size={14} className="text-apple-green" />
                  <span className="text-gray-600 dark:text-gray-300">Includes warmup + campaigns</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <Check size={14} className="text-apple-green" />
                  <span className="text-gray-600 dark:text-gray-300">Ideal for agencies managing many clients</span>
                </li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary text-sm px-8 py-3"
              >
                Add to Business Plan
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6 font-light">
            All paid plans include a 14-day free trial. No credit card required for Free plan.
          </p>
          <div className="flex flex-wrap justify-center items-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
            <span>✓ Cancel anytime</span>
            <span>✓ 24/7 support</span>
            <span>✓ No setup fees</span>
            <span>✓ Lifetime options available</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;