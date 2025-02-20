import React , {useState , useEffect} from 'react'
import 'prismjs/themes/prism-tomorrow.css'
import prism from 'prismjs'
import axios from 'axios'
import Editor from 'react-simple-code-editor'
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import Loading from './Loading.jsx'

import Markdown from 'react-markdown'
const Main = () => {

    const [code , setCode] = useState('')
    const [output , setOutput] = useState('')
    const [loading , setLoading ] = useState(false)

    useEffect(() => {
      prism.highlightAll()
     
    }, [])

    

    async function review(){
        setLoading(true)
        const responce = await axios.post(`${import.meta.env.VITE_BASE_URL}/get-review` , {code}) ;
setLoading(false)
      setOutput(responce.data)
    }
    

  return (
    <div className='h-screen flex p-3 justify-between w-screen'>
      <div className='relative h-full w-[49.5%] bg-black border-2 rounded-lg border-gray-600'>
    
    <Editor 
    value={code} 
    onValueChange={code => setCode(code)}
    highlight={code=> prism.highlight(code , prism.languages.javascript , "javascript")}
    padding={10}
    className='font-12 text-white  h-full w-full'
    >

    </Editor>

    <button
    onClick={review}
    className='rounded-lg mr-2 mb-2 font-semibold absolute bottom-0 right-0 bg-white p-3 text-black '>
        Review
    </button>

      </div>

      <div className='h-full text-white w-[49.5%]  overflow-scroll px-3 py-2 bg-gray-600 border-2 rounded-lg border-black'>
     {loading ? <Loading /> : (
                    <Markdown rehypePlugins={[rehypeHighlight]}>
                        {output}
                    </Markdown>
                )}
    </div>
    </div>
  )
}

export default Main
