import moment from "moment"
import { types } from "../types/types"


const initialState = {
   events: [{
      id: new Date().getTime(),
      title: 'Osito Birthday',
      // no es serializable asíq ue nos da un warning 
      start: moment().toDate(), // devuleve la fecha y hora actual
      end: moment().add(2, 'hours').toDate(),
      bgcolor: '#fafafa',
      notes: 'Buy him a cake',
      user: {
         _id: '123',
         name: 'Gatita'
      }
   }],
   activeEvent: null // objeto con todas las propriedaes del evento
}

export const calendarReducer = ( state = initialState, action ) => {
   switch ( action.type ) {
      case types.eventSetActive:
         return {
            ...state, 
            activeEvent: action.payload,
         }
      case types.eventAddNew:
         return {
            ...state,
            events:[
               ...state.events,
               action.payload,
            ]
            
         }
      case types.clearActiveEvent:
         return{
            ...state,
            activeEvent: null, 
         }
      case types.eventUpdate:
         return {
            ...state, 
            events: state.events.map(
               // si el id del evento es  igual al id del evento 
               e => ( e.id === action.payload.id ) ? action.payload : e
            )
         }
      case types.eventDelete:
         return {
            ...state,
            // filtramos los eventos en para mostrar los eventos que no borramos
            events: state.events.filter(
               // si el id del evento es  igual al id del evento 
               e => ( e.id !== state.activeEvent.id )
            ),
            // setamos el active event a null
            activeEvent: null,
         }

      default:
         return state
   }
}