export const Navbar = () => {
   return (
      <div
         className="navbar navbar-dark bg-dark mb-4"
      >
         <span className="navbar-brand ms-3">
            Osito     
         </span>

         <button
            className="btn btn-outline-danger me-3"
         >
            <i className="fas fa-sign-out me-2"></i>
            <span>Logout</span>
         </button>
      </div>
   )
}