import React from 'react';
import Footer from './Footer';

type NavProps = {
    language:string,
    setLanguage: (lang: string) => void;

};

const Nav:React.FC<NavProps> = ({language,setLanguage}) => {
    const handleLanguageChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        setLanguage(e.target.value);
    }


    return 	<div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full">
    <div className="flex items-center text-white">
      <select
        value={language}
        onChange={handleLanguageChange}
        className="flex cursor-pointer border-[1px] border-white/5 backdrop-blur-sm items-center rounded focus:outline-none bg-white/10 text-dark-label-2 hover:bg-dark-fill-2 px-2 py-1.5 font-medium ml-2 text-black"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
      </select>
    </div>
    <div>
    <div className='ml-auto flex items-center space-x-4'>
					<button
						className='px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-dark-fill-3  hover:bg-dark-fill-2 text-dark-label-2 rounded-lg'
						// onClick={handleSubmit}
					>
						Run
					</button>
					<button
						className='px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-dark-green-s hover:bg-green-3 rounded-lg'
						// onClick={handleSubmit}
					>
						Submit
					</button>
				</div>
    </div>
  </div>

    
}
export default Nav;