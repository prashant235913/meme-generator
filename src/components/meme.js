import React from "react";
import memesData from "../memesData.js"

export default function Meme(props){
    const [memeImg , newMemeImg]=React.useState(
        {
            topText:"" , 
            bottomText:"" , 
            randomImg: "http://i.imgflip.com/1bij.jpg" ,
        }
    )

    const [memechit , newMemeData] = React.useState(memesData)

    // Effects for new image Everytime
    React.useEffect(()=> {
     fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => newMemeData(data.data.memes))
    } , []
    )

    //Function used to change the meme when button is clicked
    function showImg() {
        // if (memechit.length > 0) { // Ensure memechit has been populated
            const randomNumber = Math.floor(Math.random() * memechit.length)
            const newImageUrl = memechit[randomNumber].url
            newMemeImg((prevMeme) => ({
                ...prevMeme,
                randomImg: newImageUrl
            }))
        
    }
    

    function handleChange(event){
        const {name , value} = event.target
        newMemeImg(function(memeImg){
            return (
                {
                    ...memeImg , 
                    [name]:value,
                }
            )
        })
    }

    return(
        <main>
        <div className="form">
                  <input 
                        type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={memeImg.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form-input"
                    name="bottomText"
                    value={memeImg.bottomText}
                    onChange={handleChange}
                />
                <button onClick={showImg}
                    className="form-button"
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={memeImg.randomImg} className="meme--image" />
                <h2 className="meme--text top">{memeImg.topText}</h2>
                <h2 className="meme--text bottom">{memeImg.bottomText}</h2>
            </div>

        </main>
       
    )

}