import { Container, Column, Row } from './index'

export default { title: 'Layout' }

export const DefaultLayout = () => ({
  components: { Container, Row, Column },
  template: `
      <container>
        <test></test>
        <row>
          <colum sm='3'>
            <div style='background: #efefef; padding: 24px;'>
              <p>TEST</p>
            </div>
          </column>

          <colum sm='3'>
            <div style='background: #efefef; padding: 24px;'>
              <p>TEST</p>
            </div>
          </column>

          <colum sm='3'>
            <div style='background: #efefef; padding: 24px;'>
              <p>TEST</p>
            </div>
          </column>
        </row>
      </container>
  `
})
