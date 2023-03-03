import { useDispatch } from "react-redux"
import { eventDelete } from "../../actions/eventActions"

export const DeleteEventFab = () => {

   const dispatch = useDispatch()

   const handleClickDelete = () => {
      dispatch( eventDelete() )
   }
  
   return (
      <button 
         className="btn btn-danger fab-danger" 
         onClick={ handleClickDelete }
      >
         <i className="fas fa-trash"></i>
         <span> Borrar evento</span>
      </button>
   )
}
