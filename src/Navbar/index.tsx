

export function Navbar() {

  return (
    <header>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "10px",
          border: "solid 1px #ccc",
          marginBottom: "10px"
        }}
      >
        <div>
          <img
            src="https://www.portal-pokemon.com/img/common/logo.png"
            alt="imagem logo pokemon"
            style={{width: "100px"}}
          />
        </div>
        <div className="field has-addons">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Find a repository"
              style={{width: "150px"}}
            />
          </div>
          <div className="control" style={{width: "20px", marginRight: "50px"}}>
            <a className="button is-info" style={{width: "45px"}}> <img src="https://img.icons8.com/?size=1x&id=7695&format=png" alt="" /> </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
