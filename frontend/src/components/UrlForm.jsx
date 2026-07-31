import { useState } from 'react';
import { createShortUrl } from '../apis/createShortUrl.api.js';
import { toast } from 'react-toastify';

const UrlForm = () => {
  const [urlValue, seturlValue] = useState('');
  const [shortUrlVal, setShortUrlVal] = useState('');
  const [copied, setCopied] = useState(false);

  /* submitHandler Function */
  const submitHandler = async (e) => {
    e.preventDefault();

    const shortUrl = await createShortUrl(urlValue);
    setShortUrlVal(`http://localhost:3000/api/url/${shortUrl}`);
    toast.success('Short url created', { autoClose: 1000 });

  };

  // const mutation = useMutation({
  //   mutationFn: submitHandler,
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ['todos'] });
  //   },
  // });

  /* copyToClipboard Function */
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrlVal);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Form */}
      <form onSubmit={(e) => submitHandler(e)} className="space-y-5">
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter URL
          </label>

          <input
            id="url"
            type="url"
            required
            placeholder="https://example.com"
            value={urlValue}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            onInput={(e) => seturlValue(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 cursor-pointer"
        >
          Shorten URL
        </button>
      </form>

      {/* Result */}
      {shortUrlVal && (
        <div className="mt-8 border border-gray-300 rounded-xl bg-slate-50 p-5">
          <h2 className="font-semibold text-lg mb-3">Generated Short URL</h2>

          <div className="flex gap-3">
            <input
              type="text"
              readOnly
              value={shortUrlVal}
              className="flex-1 border border-gray-300 outline-none rounded-lg px-4 py-3 bg-white"
            />

            <button
              onClick={copyToClipboard}
              className={`px-6 rounded-lg cursor-pointer transition-all duration-300
    ${
      copied
        ? 'bg-green-600 text-white'
        : 'border border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white'
    }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UrlForm;
