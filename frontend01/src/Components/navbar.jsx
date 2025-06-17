function Navbar(){
    return(
        <>
            <nav>
                <input type="checkbox" id='check' />
                <ul id="left">
                    <li>
                        <img src="https://img.freepik.com/free-psd/restaurant-vintage-badge-template-psd-set-remixed-from-public-domain-artworks_53876-141767.jpg?semt=ais_hybrid&w=740" className="logo" />
                    </li>
                    <li className="naMe">
                        <label className="logo">SCHEDEXO</label>
                    </li>
                </ul>
                <ul id="right">
                    <li className="coNnect" id="change">
                        <a href="#">
                            <i class="fa-solid fa-plus"></i>
                            <span> Connect</span>
                        </a>
                    </li>
                    <li className="creAte" id="change">
                        <a href="#">
                            <span>Create</span>
                        </a>
                    </li>
                    <li className="doubt" id="change">
                        <a href="#">
                            <i class="fa-solid fa-circle-question"></i>
                        </a>
                    </li>
                    <li className="profilePic">
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="userPic" />
                    </li>
                </ul>
                <label htmlFor="check" id="checkBtn"><i class="fa-solid fa-bars"></i></label>
            </nav>
        </>
    )
}

export default Navbar;