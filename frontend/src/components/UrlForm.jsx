import { useState } from 'react';
import { Link2, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { createShortUrl } from '../apis/createShortUrl.api.js';

const UrlForm = () => {
  const [urlValue, seturlValue] = useState('');
  const [shortUrlVal, setShortUrlVal] = useState('');
  const [copied, setCopied] = useState(false);
  const queryClient = useQueryClient();

  /* submitHandler Function */
  const submitHandler = async (e) => {
    e.preventDefault();

    const shortUrl = await createShortUrl(urlValue);
    setShortUrlVal(shortUrl);
    queryClient.invalidateQueries({ queryKey: ['user-allUrls'] });
    seturlValue('');
    toast.success('Short url created', { autoClose: 1000 });
  };

  return (
    <>
      {/* Form */}
      <form onSubmit={submitHandler} className="space-y-6">
        {/* Heading */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r from-indigo-600 to-cyan-500">
            <Sparkles className="h-7 w-7 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-[#00A5E1]">Create Short URL</h2>

          <p className="mt-2 text-slate-400">
            Paste your long URL below and generate a secure short link
            instantly.
          </p>
        </div>

        {/* URL Input */}
        <div>
          <label
            htmlFor="url"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Long URL
          </label>

          <div className="flex items-center rounded-xl border border-slate-700 bg-slate-950 px-4 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
            <Link2 className="h-5 w-5 text-slate-500" />

            <input
              id="url"
              type="url"
              required
              value={urlValue}
              onChange={(e) => seturlValue(e.target.value)}
              placeholder="https://example.com/very-long-url"
              className="w-full bg-transparent px-3 py-4 text-white placeholder:text-slate-500 outline-none"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-linear-to-r from-indigo-600 to-cyan-500 py-3.5 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/30 active:scale-[0.98]"
        >
          Shorten URL
        </button>
      </form>
    </>
  );
};

export default UrlForm;
