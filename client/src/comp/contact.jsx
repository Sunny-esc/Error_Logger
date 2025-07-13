import React, { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

export default function SimplePaper() {
  const [user, setUser] = useState({
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

    const pingServer = async () => {
  try {
    await axios.get("https://error-logger.onrender.com/");
  } catch (err) {
    console.warn("Ping failed — probably sleeping");
  }
};

const retry=async (payload, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await axios.post(
        "https://error-logger.onrender.com/api/feedback",
        payload,
        { withCredentials: true }
      );
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((res) => setTimeout(res, 3000)); // 3s delay between retries
    }
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast("Waking up the server,hang in there...", { duration: 5000 });
    await pingServer();

    try {
      const response = await retry({
        email: user.email,
        message: user.message,
      });
      console.log("feedback successful:", response.data);
      toast.success("Thanks for contacting ! I will work on it 🫡");
      setUser({ email: "", message: "" });
    } catch (error) {
      console.error("feedback error:", error);
      toast.error("Failed to send feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="flex flex-col md:flex-row  rounded-2xl p-6 md:p-10 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg max-w-4xl w-full mx-4">
        <div className="flex justify-center items-center md:w-1/2 mb-6 md:mb-0">
          <DotLottieReact
            src="https://lottie.host/992c8167-f043-45ea-9181-f66c466461c0/8r0fqaCaVx.lottie"
            loop
            autoplay
            className="w-48 h-48 md:w-64 md:h-64"
          />
        </div>

        {/* Contact Form */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-6 text-center">Contact Dev</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
        <div className="mb-6">
      <FormControl fullWidth variant="outlined">
        <InputLabel
          htmlFor="email"
          sx={{
            color: 'text.primary',
            '&.Mui-focused': {
              color: 'text.primary',
            },
          }}
        >
          Email
        </InputLabel>
        <OutlinedInput
          id="email"
          label="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
          sx={{
            color: 'text.primary',
            backgroundColor: 'rgb(226 232 240)', // Tailwind bg-slate-200
            borderRadius: '0.5rem', // rounded
            fontSize: '1rem', // text-lg
            '& fieldset': {
              borderColor: 'rgba(100, 116, 139, 0.5)', // border-slate-400
            },
            '&:hover fieldset': {
              borderColor: 'rgba(100, 116, 139)', // darker on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#64748b', // focus color
            },
          }}
        />
      </FormControl>
    </div>
             
            </div>

          <div className="mb-6">
  <TextField
    label="Message"
    name="message"
    value={user.message}
    onChange={handleChange}
    required
    multiline
    rows={4}
    fullWidth
    variant="outlined"
    sx={{
      color: 'text.primary',
      backgroundColor: 'rgb(226 232 240)', // Tailwind bg-slate-200
      borderRadius: '0.5rem',
      fontSize: '1rem',
      '& .MuiInputBase-input': {
        color: 'inherit',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'rgba(100, 116, 139, 0.5)',
        },
        '&:hover fieldset': {
          borderColor: 'rgba(100, 116, 139)',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#64748b',
        },
       
      },
    }}
    InputLabelProps={{
      sx: {
        color: 'text.sucess',
        
      },
    }}
  />
</div>
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-slate-900 text-white text-xl rounded-xl border shadow-2xl px-6 py-2 hover:bg-slate-800"
              >
                {loading ? "Loading..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

