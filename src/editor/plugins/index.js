import TailwindBlocks from 'wsm-tailwind'
import WSMFonts from 'wsm-fonts'
import FileTrait from './FileTrait'
import DatasourceTrait from './DatasourceTrait'
import EditorToolbar from './EditorToolbar'
import PageManager from './PageManager'
import TextBlocks from './TextBlocks'
import ButtonBlocks from './ButtonBlocks'
import ImageBlocks from './ImagesBlocks'
import VideoBlocks from './VideoBlocks'
import Web3LoginButton from './Web3LoginButton'
import ModalBlock from './ModalBlock'
import Web3ContractForm from './web3-contract-form'
import FaqBlock from './FaqBlock'
import ScheduleBlock from './ScheduleBlocks'
import TimerBlocks from './TimerBlocks'

export const plugins = [
    // Block Traits
    FileTrait,
    DatasourceTrait,
    // Editor
    EditorToolbar,
    PageManager,
    // Blocks
    WSMFonts,
    TextBlocks,
    ButtonBlocks,
    ImageBlocks,
    VideoBlocks,
    TailwindBlocks,
    Web3LoginButton,
    Web3ContractForm,
    ModalBlock,
    FaqBlock,
    ScheduleBlock,
    TimerBlocks
]

export const getPlugin = (name) => plugins.find((plugin) => plugin.name === name)