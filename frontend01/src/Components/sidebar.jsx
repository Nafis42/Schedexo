import { useState } from 'react';

function Sidebar(){
    let [disp01, setDisp01] = useState('none');
    let [disp02, setDisp02] = useState('none');
    const changeDisp01= ()=>{
        if(disp01=='none'){
            disp01 = 'block';
            console.log("clicked");
            setDisp01(disp01);
        }
        else if(disp01 == 'block'){
            disp01 = 'none';
            setDisp01(disp01);
        }
    }

    const changeDisp02= ()=>{
        if(disp02=='none'){
            disp02 = 'block';
            console.log("clicked");
            setDisp02(disp02);
        }
        else if(disp02 == 'block'){
            disp02 = 'none';
            setDisp02(disp02);
        }
    }
    return(
        <>
            <aside>
                <nav1>
                    <ul>
                        <li>
                            <a href="#" className="active">
                                <i class="fa-solid fa-house"></i>
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa-solid fa-plus"></i>
                                <span>Create</span>
                                <i class="fa-solid fa-angle-down"></i>

                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa-solid fa-calendar"></i>
                                <span>Calendar</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa-solid fa-square-poll-vertical"></i>
                                <span>Analytics</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="integrationDropdown" onClick={changeDisp01}>
                                <i class="fa-solid fa-link"></i>
                                <span>Integration</span>
                                <i class="fa-solid fa-angle-down"></i>
                            </a>
                            <div className="dropdownMenu01" style={{display: disp01}}>
                            <ul>
                                <li>
                                    <a href="#">
                                        <span>All Channels</span>
                                        <i class="fa-solid fa-angle-down"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="connectDropdown" onClick={changeDisp02}>
                                        <span>Connect New</span>
                                        <i class="fa-solid fa-angle-down"></i>
                                    </a>
                                    <div className="dropdownMenu02" style={{display: disp02}}>
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <i class="fa-brands fa-instagram"></i>
                                                <span>Instagram</span>
                                                <i class="fa-solid fa-plus"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="fa-brands fa-linkedin"></i>
                                                <span>LinkedIn</span>
                                                <i class="fa-solid fa-plus"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="fa-brands fa-square-x-twitter"></i>
                                                <span>Twitter / X</span>
                                                <i class="fa-solid fa-plus"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="fa-brands fa-facebook"></i>
                                                <span>Facebook</span>
                                                <i class="fa-solid fa-plus"></i>
                                            </a>
                                        </li>
                                    </ul>
                                    </div>
                                </li>
                            </ul>
                            </div>
                        </li>
                    </ul>
                </nav1>
            </aside>
        </>
    )
}

export default Sidebar;