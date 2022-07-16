import asscessory_world_logo from './icon/accesssory_world.svg'

function Header() {
    return (
        <div className="header">
            <div className="header1">
                <img src={asscessory_world_logo} alt="" />
            </div>
            <div className="header2">
                <h2>Accessosy World</h2>
            </div>
            <div className="header3">
                <div className="search-container">
                    <form action="/action_page.php">
                        <input type="text" placeholder="Search.." name="search" />
                        <button type="submit"><i class="fa fa-search"></i></button>
                    </form>
                </div>
            </div>
            <div className="header4">h4</div>
            <div className="header5">h5</div>
            <div className="header6">h6</div>
        </div>
    )
}

export default Header