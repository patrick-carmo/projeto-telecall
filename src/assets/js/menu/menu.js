import dark from '../dark.js'
import acc from './acc.js'
import menuMobile from './menu-mobile.js'
import dropdown from './dropdown-menu.js'
import menuFixo from './menu-fixo.js'
import verificarCadastro from '../login/verificarOperacao.js'
import grid from '../principal/gridSpan.js'
import scroll from '../principal/scroll.js'

verificarCadastro()
menuFixo()
dark()
acc()
menuMobile()
dropdown()
grid()
scroll()