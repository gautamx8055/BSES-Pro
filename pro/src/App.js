import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OTPVerification from './Components/page1';
import Request from './Components/page2';
import PersonalDetailsForm from './Components/page3';
// import { FormProvider } from './components/FormContext';


function App() {
  return (
      <Router>
        <Routes>
        <Route path="/" element={<OTPVerification />} />
        <Route path="/request" element={<Request />} />
        <Route path="/page3" element={<PersonalDetailsForm />} />
        {/* <Route path="/form" element={<Form />} />
        <Route path="/preview" element={<Preview />} /> */}
        </Routes>
      </Router>
  );
}

export default App;
