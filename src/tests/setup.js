import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import jestFetchMock from 'jest-fetch-mock'

global.fetch = jestFetchMock
configure({ adapter: new Adapter() })
