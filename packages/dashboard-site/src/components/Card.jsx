import styles from '../styles/card.module.css'
import { Link, NavLink } from "react-router-dom";
import Button from '@mui/material/Button';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import { GrInstallOption } from 'react-icons/gr';


export default function Card(props) {
    function func(){
        // code to run the script for installing the snaps




        // code to redirect to the dapp page
        window.open(props.install_link, "_blank")
    }
    return (
        <div >
            <div className={styles.box}>
                {/* <div className={styles.box1}>
                    <Link className = {styles.link}> <BsFillArrowDownCircleFill style = {{"fontSize":"25px"}}/> </Link>
                </div> */}
                <div className={styles.box2}>
                    <h1>{props.title}</h1>
                    <p>{props.description}</p>
                    <Link onClick={()=>window.open(props.learn_more_link,"_blank")} className={styles.link}> Learn More</Link>
                </div>
                <div className={styles.box3}>
                    {props.price}
                    <div className={styles.box4}>
                        <Link className = {styles.link}> <BsFillBookmarkFill style = {{"fontSize":"25px","marginRight":"8px"}}/> </Link>
                        <Link className = {styles.link} onClick={func} href={props.install_link} > <BsFillArrowDownCircleFill style = {{"fontSize":"25px"}}/> </Link>
                    </div>

                </div>
                
            </div>
        </div>
    )
}