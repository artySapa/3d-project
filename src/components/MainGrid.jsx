import React, {useState, useEffect} from "react";

import axios from "axios";

const MainGrid = () => {
    const URL = "http://localhost:8080";

    const [entries, setEntries] = useState([]);

    /* FOR ADDITIONS */
    const [entryContents, setEntryContents] = useState("");
    const [rank, setRank] = useState(0);
    /* ------------- */

    const addPost = () => {
        axios
        .post(`${URL}/entries/new`, {
            content: entryContents,
            rank: rank,
            timestamp: Date.now(),
        })
        .then((response) => {
            setEntries((prevEntries) => {
                return [...prevEntries, response.data];
            });
        })
        .catch(console.error);

        setRank(0);
        setEntryContents("");
    }

    const getFeed = () => {
       axios
       .get(URL + "/entries")
       .then((response) => {
        setEntries(response.data);
       })
       .catch(console.error);
    };

    useEffect(() => {
        getFeed();
    }, [entries]);

    return (
        <div className="p-20 flex justify-between">
            <input className="p-5" type="text" value={entryContents} onChange={(e) => {setEntryContents(e.target.value)}} placeholder="Give a name" />
            <input className="p-5" type="text" value={rank} onChange={(e) => {setRank(e.target.value)}} placeholder="Set the rank" />
            <button className="bg-[pink] p-2 text-black" onClick={() => {addPost();}}>ADD REQUEST TO THE COMMUNITY</button>
            <div>
                {entries.map((entry) => {
                    <div>{entry}</div>
                })}
            </div>
        </div>
    );
}

export default MainGrid;