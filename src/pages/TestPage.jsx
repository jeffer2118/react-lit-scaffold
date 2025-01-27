import { useState } from 'react'
import { AlertComponent, ButtonComponent, PieChartComponent, ModalComponent, TableComponent, FormElements } from '../components/ReactWrappers'

function TestPage() {
  const [pieData] = useState([
    { value: 30, color: '#FF6B6B' },
    { value: 45, color: '#4ECDC4' },
    { value: 25, color: '#45B7D1' },
  ])

  return (
    <div className="test-page">
      <h1>Component Test Page</h1>
      
      <section>
        <h2>Alerts</h2>
        <AlertComponent alertformat="info">
          <span slot="alert-banner-title">Info Alert</span>
          <span slot="alert-banner-description">This is an informational alert.</span>
        </AlertComponent>
        
        <AlertComponent alertformat="error">
          <span slot="alert-banner-title">Error Alert</span>
          <span slot="alert-banner-description">This is an error alert.</span>
        </AlertComponent>
      </section>

      <section>
        <h2>Buttons</h2>
        <ButtonComponent buttonformat="primary">Primary Button</ButtonComponent>
        <ButtonComponent buttonformat="secondary">Secondary Button</ButtonComponent>
        <ButtonComponent buttonformat="accentcool">Accent Cool</ButtonComponent>
      </section>

      <section>
        <h2>Pie Chart</h2>
        <PieChartComponent chartdata={pieData}></PieChartComponent>
      </section>

      <section>
        <h2>Modal</h2>
        <ModalComponent 
          buttontitle="Open Test Modal"
          modaltitle="Test Modal"
          modaldescription="This is a test modal component."
          modalactionbutton="Confirm"
          modalcancelbutton="Cancel"
        ></ModalComponent>
      </section>
      <section>
        <h2>Table</h2>
        <TableComponent></TableComponent>
      </section>
    </div>
  )
}

export default TestPage