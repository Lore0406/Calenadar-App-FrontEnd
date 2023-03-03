//FAB - floating action botton

import { useDispatch } from "react-redux"
import { uiOpenModal } from "../../actions/uiActions"
import { clearActiveEvent } from "../../actions/eventActions"

export const AddNewFab = () => {

   const dispatch = useDispatch()
   const handleClickNew = () => {
      dispatch( uiOpenModal() )
   }
   return (
      <button
         className="btn btn-primary fab"
         onClick={ handleClickNew }
      >
         <i className="fas fa-plus">
         </i>
      </button>
   )
}

