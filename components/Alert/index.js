/* import { confirmAlert } from 'react-confirm-alert'
import '@node_modules/react-confirm-alert/src/react-confirm-alert.css'

const Alert = ({title, message, buttonOk, okCallback, buttonCancel, cancelCallback}) => {
  const submit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes'),
        },
        {
          label: 'No',
          onClick: () => alert('Click No'),
        },
      ],
    })
  }

  render() {
    return (
      <div className='container'>
        <button onClick={this.submit}>Confirm dialog</button>
      </div>
    );
  }
}

export default Alert
 */
