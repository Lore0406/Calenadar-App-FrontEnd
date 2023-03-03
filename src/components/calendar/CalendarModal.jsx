import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-modal'
import moment from 'moment'
import DateTimePicker from 'react-datetime-picker'
import Swal from 'sweetalert2'
import { customStyles } from "../../helpers/calendar-modal-styles"
import { uiCloseModal } from "../../actions/uiActions";
import { clearActiveEvent, eventAddNew, eventUpdate } from "../../actions/eventActions";
Modal.setAppElement('#root')

// seteamos la fecha al momento actual - hora en punto +1 hora
const now = moment().minutes( 0 ).seconds( 0 ).add( 1, 'hours' )
const finish = now.clone().add( 1, 'hours' )

// iniciamos los eventos
const initEvent = {
   title: '',
   notes: '',
   start: now.toDate(),
   end: finish.toDate(),
}

export const CalendarModal = () => {

   // usando disptach para disparar la accción y useSelector 
   // desestructurando el estado para sacar el modalOpen  y así
   // poder cambiar su estado al hacer click o doble click con el uiReduceer
   const dispatch = useDispatch()
   const { modalOpen } = useSelector( state => state.ui )

   // sacamos del estado el activeEvent para poder hacer la renderización 
   // en base al cambio de este ultimo
   const { activeEvent } = useSelector( state => state.calendar )

   const [ dateStart, setDateStart ] = useState( now.toDate() )
   const [ dateEnd, setDateEnd ] = useState( finish.toDate() )
   const [ titleValid, setTitleValid ] = useState( true )

   // usamos useState para sacar los datos del formulario
   const [ formValues, setFormValues ] = useState( initEvent )
   const { title, notes, start, end } = formValues

   // usando useefecto mostramos las formvalues dentro del modal en base al cambio
   // del evento activo
   useEffect(() => {
      if ( activeEvent ) {
         setFormValues( activeEvent )
      } else {
         setFormValues ( initEvent )
      }
   }, [ activeEvent, setFormValues ])

   // desestructuramos event y sacamos target
   const handleInputChange = ({ target }) => {
      setFormValues({
         ...formValues,
         [target.name]: target.value,
      })

   }

   // hacemos el dispatch para cerrar el Modal
   const closeModal = () => {
      dispatch( uiCloseModal() )
      dispatch( clearActiveEvent() )

      // resetear valores del modal a los valores por defecto del evento
      setFormValues(initEvent)
   }

   const handleStartDateChange = ( e ) => {
      setDateStart( e )
      setFormValues({
         ...formValues,
         start: e,
      })
   }

   const handleEndDateChange = ( e ) => {
      setDateEnd( e )
      setFormValues({
         ...formValues,
         end: e,
      })
   }

   const handleSubmitForm = ( e ) => {
      e.preventDefault()

      const momentStart = moment( start )
      const momentEnd = moment( end )

      if ( momentStart.isSameOrAfter( momentEnd ) ) {
         return Swal.fire( 'Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error' )
      }

      if ( title.trim().length < 2 ) {
         return setTitleValid( false ) // usamos useState con una clase bootstrap que se asigna por un booleano
         // return Swal.fire( 'Error', 'Debe introducir un título', 'error')
      }

      // si el activeevent existe lo actualizamos sino añadimos uno nuevo
      if ( activeEvent ) {
         dispatch( eventUpdate( formValues ) )
      } else {
         dispatch( eventAddNew({
            ...formValues,
            id: new Date().getTime(),
            user: {
               _id: '1230',
               name: 'Osito'
            }
         }))
      }
      
      // TODO -- guardar datos en la BD
      setTitleValid( true )
      closeModal()

   }



   return (
      <Modal
         isOpen={ modalOpen }
         //   onAfterOpen={ afterOpenModal }
         onRequestClose={ closeModal }
         style={ customStyles }
         closeTimeoutMS={ 200 }
         className='modal'
         overlayClassName='modal-fondo'
      >
         {
            ( !activeEvent ) ? <h1> Nuevo evento </h1> : <h1>Editar evento</h1>
         }
         <hr />
         <form
            className="container"
            onSubmit={ handleSubmitForm }
         >

            <div className="form-group mb-2">
               <label>Fecha y hora inicio</label>
               <DateTimePicker
                  className="form-control"
                  onChange={ handleStartDateChange }
                  value={ dateStart }
               />
            </div>

            <div className="form-group mb-2">
               <label>Fecha y hora fin</label>
               <DateTimePicker
                  className="form-control"
                  onChange={ handleEndDateChange }
                  minDate={ dateStart }
                  value={ dateEnd }
               />
            </div>

            <hr />
            <div className="form-group mb-2">
               <label>Titulo y notas</label>
               <input
                  type="text"
                  className={`form-control ${ !titleValid && 'is-invalid' }`}
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  value={title}
                  onChange={ handleInputChange }
               />
               <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
               <textarea
                  type="text"
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
                  name="notes"
                  value={ notes }
                  onChange={ handleInputChange }
               ></textarea>
               <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
               type="submit"
               className="btn btn-outline-primary btn-block"
            >
               <i className="far fa-save"></i>
               <span> Guardar</span>
            </button>

         </form>
      </Modal>

   )
}