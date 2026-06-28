import { useState, useCallback, useEffect, useRef } from 'react';

export default function Pass_gen() {
  const [length, setLength] = useState(8);
  const [char, setChar] = useState(false);
  const [num, setNum] = useState(false);
  const [u_alpha, setU_alpha] = useState(true);
  const [l_alpha, setL_alpha] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  
  const passwordGenerator = useCallback(() => {

    let pass = '';
    let str = '';
    
    if (char)    str += '!@#$%^&*()_+-=[]{}|?';
    if (num)     str += '0123456789';
    if (u_alpha) str += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (l_alpha) str += 'abcdefghijklmnopqrstuvwxyz';

    if (str === '') {
      pass = 'Click Something...'
      setPassword(pass);
    } else {
      for (let i = 0; i < length; i++) {
        pass += str[Math.floor(Math.random() * str.length)];
      }
      setPassword(pass);
    }
  }, [length, char, num, u_alpha, l_alpha]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className='w-full h-screen flex justify-center items-center bg-black'>
      <div className='h-fit p-5 w-[80%] bg-purple-700 border-2 border-solid border-black rounded-lg flex flex-col items-center justify-center gap-5'>

        <div className='w-[90%] h-12 pl-2 py-5 flex justify-between items-center bg-red-200 border-gray-300 rounded-lg'>
          <div
            ref={passwordRef}
            className='w-[90%] h-fit tracking-wider flex flex-col justify-center text-lg overflow-x-auto whitespace-nowrap px-1 rounded-lg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          >
            <p className='p-0 font-mono'>{password}</p>
          </div>

          <button
            onClick={copyToClipboard}
            title="Copy password"
            className='bg-blue-200 h-12 w-12 flex justify-center items-center border border-solid border-blue-300 rounded-lg cursor-pointer transition-all active:scale-95 text-sm font-semibold text-blue-800'
          >
            {copied ? '✓' : 'Copy'}
          </button>
        </div>

        <div className='w-[90%] h-fit p-2 gap-4 flex flex-wrap justify-around items-center'>

          <button
            onClick={passwordGenerator}
            className='px-4 py-2 bg-red-100 border border-gray-300 rounded-lg cursor-pointer transition-all active:scale-95 font-semibold hover:bg-red-200'
          >
            Generate
          </button>

          <div className='flex flex-col items-center gap-1'>
            <label htmlFor='lengthVal' className='text-sm font-medium text-white'>
              Length: {length}
            </label>
            <input
              type='range'
              id='lengthVal'
              min='4'
              max='32'
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className='w-32 cursor-pointer'
            />
          </div>

          <div className='flex text-white items-center flex-wrap gap-4'>
            <label className='cursor-pointer flex items-center gap-1'>
              <input
                type='checkbox'
                checked={char}
                onChange={(e) => setChar(e.target.checked)}
              />
              Special chars
            </label>
            <label className='cursor-pointer flex items-center gap-1'>
              <input
                type='checkbox'
                checked={num}
                onChange={(e) => setNum(e.target.checked)}
              />
              Numbers
            </label>
            <label className='cursor-pointer flex items-center gap-1'>
              <input
                type='checkbox'
                checked={u_alpha}
                onChange={(e) => setU_alpha(e.target.checked)}
              />
              Uppercase
            </label>
            <label className='cursor-pointer flex items-center gap-1'>
              <input
                type='checkbox'
                checked={l_alpha}
                onChange={(e) => setL_alpha(e.target.checked)}
              />
              Lowercase
            </label>
          </div>
        </div>

      </div>
    </div>
  );
}