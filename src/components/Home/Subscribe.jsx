import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Subscribe() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' | 'error'

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.name || user.email) setFormData({ name: user.name || '', email: user.email || '' });
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setMessageType('success');
        if (!localStorage.getItem('user')) setFormData({ name: '', email: '' });
      } else {
        throw new Error(data.error || 'Subscription failed');
      }
    } catch (err) {
      console.error(err);
      const offline = err.message.includes('Failed to fetch');
      setMessage(offline ? 'Cannot connect to server.' : 'Network error. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (<>
    <section className="relative py-24 bg-cover bg-center z-5" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1500&q=80')" }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="text-4xl font-bold bg-gradient-to-r from-purple-900 to-blue-300 bg-[length:200%_200%] bg-clip-text text-transparent mb-4"
            >
              Exclusive Deals Just For You
            </motion.h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-12">Subscribe to our newsletter for unique offers & destination insights.</p>
          
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              messageType === 'success' 
                ? 'bg-green-500/20 border border-green-500/50 text-green-300' 
                : 'bg-red-500/20 border border-red-500/50 text-red-300'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 md:p-10 flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name" 
              className="flex-1 border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2" 
            />
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email" 
              className="flex-1 border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2" 
              required
            />
            <motion.button 
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.05 }} 
              className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white shadow-md ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </motion.button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Subscribe;