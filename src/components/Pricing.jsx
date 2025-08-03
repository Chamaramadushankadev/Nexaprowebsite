import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Star, Zap } from 'lucide-react';

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isYearly, setIsYearly] = useState(false);

  // Placeholder Stripe checkout function
  const handleStripeCheckout = (planName, priceId) => {
    console.log(`Initiating Stripe checkout for ${planName} with price ID: ${priceId}`);
    
    // TODO: Replace with actual Stripe integration
    // const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    // const { error } = await stripe.redirectToCheckout({
    //   lineItems: [{ price: priceId, quantity: 1 }],
    //   mode: 'subscription',
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
      name: 'Personal',
      monthlyPrice: 9,
      yearlyPrice: 72, // 20% discount
      description: 'Perfect for individuals getting started',
      features: [
        'All core productivity features',
        'Up to 5 projects',
        '10GB storage',
        'Basic analytics',
        'Email support',
        'Mobile apps'
      ],
      buttonText: 'Start Free Trial',
      popular: false,
      monthlyPriceId: 'price_personal_monthly',
      yearlyPriceId: 'price_personal_yearly'
    },
    {
      name: 'Professional',
      monthlyPrice: 29,
      yearlyPrice: 232, // 20% discount
      description: 'Ideal for professionals and small teams',
      features: [
        'Everything in Personal',
        'Unlimited projects',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'Team collaboration',
        'API access',
        'Custom integrations'
      ],
      buttonText: 'Get Started',
      popular: true,
      monthlyPriceId: 'price_professional_monthly',
      yearlyPriceId: 'price_professional_yearly'
    },
    {
      name: 'Enterprise',
      monthlyPrice: 99,
      yearlyPrice: 792, // 20% discount
      description: 'For large teams and organizations',
      features: [
        'Everything in Professional',
        'Unlimited storage',
        'Advanced security',
        'Dedicated support',
        'SLA guarantee',
        'Custom development',
        'On-premise deployment',
        'Advanced compliance'
      ],
      buttonText: 'Contact Sales',
      popular: false,
      monthlyPriceId: 'price_enterprise_monthly',
      yearlyPriceId: 'price_enterprise_yearly'
    }
  ];

  const getCurrentPrice = (plan) => {
    return isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  };

  const getCurrentPriceId = (plan) => {
    return isYearly ? plan.yearlyPriceId : plan.monthlyPriceId;
  };

  const getPeriodText = () => {
    return isYearly ? '/year' : '/month';
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
            Choose the perfect plan for your needs. All plans include a 14-day free trial.
          </motion.p>
          
          {/* Billing Toggle */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center glass-effect rounded-full p-1 relative"
          >
            <button 
              onClick={() => setIsYearly(false)}
              className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 relative z-10 ${
                !isYearly 
                  ? 'text-white bg-apple-blue shadow-lg' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-apple-blue'
              }`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsYearly(true)}
              className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 relative z-10 ${
                isYearly 
                  ? 'text-white bg-apple-blue shadow-lg' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-apple-blue'
              }`}
            >
              <span>Yearly</span>
              <span className="ml-1 text-xs bg-apple-green text-white px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className={`relative glass-effect rounded-3xl p-8 transition-all duration-300 ${
                plan.popular 
                  ? 'ring-2 ring-apple-blue shadow-2xl scale-105' 
                  : 'hover:shadow-xl'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-apple-blue to-apple-purple text-white px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-1 shadow-lg">
                    <Star size={14} />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 font-light">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">
                    ${getCurrentPrice(plan)}
                  </span>
                  <span className="text-xl text-gray-600 dark:text-gray-300 ml-1 font-light">
                    {getPeriodText()}
                  </span>
                </div>
                {isYearly && (
                  <div className="text-sm text-apple-green mt-2">
                    Save ${(plan.monthlyPrice * 12) - plan.yearlyPrice} per year
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Check size={20} className="text-apple-green" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-300 font-light">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                onClick={() => handleStripeCheckout(plan.name, getCurrentPriceId(plan))}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-full font-medium transition-all duration-300 ${
                  plan.popular
                    ? 'bg-apple-blue hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
                    : 'glass-effect hover:bg-white/10 text-gray-900 dark:text-white border border-white/20 dark:border-gray-700/50'
                }`}
              >
                {plan.name === 'Enterprise' ? (
                  <div className="flex items-center justify-center space-x-2">
                    <span>{plan.buttonText}</span>
                    <Zap size={18} />
                  </div>
                ) : (
                  plan.buttonText
                )}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mt-20"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6 font-light">
            All plans include a 14-day free trial. No credit card required. {isYearly ? 'Billed annually.' : 'Billed monthly.'}
          </p>
          <div className="flex flex-wrap justify-center items-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
            <span>✓ Cancel anytime</span>
            <span>✓ 24/7 support</span>
            <span>✓ No setup fees</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;