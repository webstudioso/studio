import { useState, useEffect, useRef } from 'react'
// material-ui
import {
    Box,
    Grid,
    Typography,
    Button,
    TextField,
    IconButton,
    Container
} from '@mui/material'
import { IconTrash } from '@tabler/icons'
import { getProjectUrl } from 'utils/project'
import { truncate } from 'utils/format'
import { useIntl } from 'react-intl'
import PageTypes from './PageTypes'
import { isHome } from 'utils/pages'
import Section from '../Section'
import { UPDATE_APP, LOADER, SET_PROJECT } from 'store/actions'
import { useDispatch } from 'react-redux'
import PagePicker from './PagePicker'
import SmartContracts from './SmartContracts'

const Pages = ({ editor, project }) => {
    const dispatch = useDispatch()
    const intl = useIntl()
    const ref = useRef(null);
    const inputRef = useRef(null);
    const [pages, setPages] = useState([])
    const [selectedPage, setSelectedPage] = useState()

    const loadPages = () => {
        const pageManager = editor.Pages;
        const allPages = pageManager.getAll();
        setPages(allPages);
        const selected = pageManager.getSelected();
        setName(getName(selected))
        setSelectedPage(selected);
    }

    const getHomePage = () => {
        const pageManager = editor.Pages;
        const allPages = pageManager.getAll();
        return allPages.find((page) => page.attributes.type === 'main' )
    }

    useEffect(() => {
        loadPages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const name = getName(selectedPage)
        setName(name)
        if (!selectedPage || !isHome(selectedPage))
            inputRef.current.focus()
    }, [selectedPage])

    const getName = (page) => {
        return !page ? '' :
                page.attributes.type === 'main' ? 'index' : page.attributes.name
    }

    const pageList = pages?.map((page) => 
        <Grid   id={page.id} 
                key={page.id}
                item 
                sx={{ 
                    p: '5px 10px', 
                    m: '0px 10px',
                    overflowY: 'none',
                    cursor: 'pointer',
                    borderRadius: '50px',
                    background: selectedPage?.id === page.id ? '#E8E8FF' : 'transparent',
                    border: selectedPage?.id === page.id ? '1px solid #D7D6FF' : '1px solid transparent'
                }} 
                onClick={(e) => {
                    // setFilter(cat.id);
                    const pageManager = editor.Pages;
                    pageManager.select(page.id);
                    setName(getName(page))
                    loadPages()
                }}
        >
            <Typography fontWeight="normal" color={
                selectedPage?.id === page.id ? '#3F41A4' : 'black'
            } fontSize={14}>{truncate(getName(page), 18)}</Typography>
        </Grid> 
    )

    const [name, setName] = useState()

    const saveAndReload =  async() => {
        const data = editor.getProjectData()
        await editor.Storage.store(data)
        loadPages()
    }

    // const ALPHA_NUMERIC_DASH_REGEX = /^[a-z0-9]+$/;

    const getPageNme = () => isHome(selectedPage) ? '' : `/${name}`
    const getPagePath = () => `${getProjectUrl({ project })}${getPageNme()}`

    const pathInput = (
        <TextField  sx={{ my: 1 }}
                fullWidth
                // size="small"
                variant="standard"
                disabled={isHome(selectedPage)}
                // InputLabelProps={{ shrink: true }}
                value={isHome(selectedPage) ? ' ' : name}
                placeholder={intl.formatMessage({id:'page_manager.path_input_placeholder'})} 
                onChange={(e) => {
                    const name = e.target.value.replaceAll(' ', '').toLowerCase();
                    setName(name)
                }}
                inputRef={inputRef}
                autoFocus={true}
                inputProps={{
                    style: {
                        color: '#222'
                    }
                }}
                InputProps={{
                    startAdornment: (
                        <Typography>
                            { getProjectUrl({ project }) }
                            { isHome(selectedPage) ? '' : '/' }
                        </Typography>
                    ),
                }}
        />
    )

    const saveButton = (
        <Button 
                fullWidth
                disabled={isHome() || !name}
                // sx={{ mt: 1 }}
                onClick={() => {
                        const pageManager = editor.Pages;

                        if (selectedPage) {
                            // Is update
                            // pageManager.remove(selectedPage.id)
                            // const home = getHomePage()
                            // console.log(home)
                            // pageManager.select(home)
                            selectedPage?.set('name', name);

                            saveAndReload()
                        } else {
                            // Is new
                            pageManager.add({
                                name,
                                component: `<div>New page ${name}</div>`
                            });

                            saveAndReload()
                            // Select last page
                    
                            const allPages = pageManager.getAll();
                            pageManager.select(allPages[allPages.length - 1])
                        }


            }}>{selectedPage ? intl.formatMessage({ id: 'page_manager.save'}) : intl.formatMessage({ id: 'page_manager.create'})}</Button>
    )

    const handleDeletePage = () => {
        const pageManager = editor.Pages;
        pageManager.remove(selectedPage.id)
        const home = getHomePage()
        pageManager.select(home)
        saveAndReload()
    }

    return (
        <Container sx={{ 
            height: 'calc(100vh - 110px)', 
            overflow: 'auto',
            border: '1px solid #dfe5eb',
            borderLeft: '0px',
            paddingTop: 1
        }}>
            <PagePicker editor={editor} 
                        project={project} 
                        pages={pages} 
                        setSelectedPage={setSelectedPage}
                        selectedPage={selectedPage}
            />
            {/* <Grid item xs={4} sx={{ 
                height: 'calc(100vh - 110px)', 
                overflow: 'auto', 
                background: '#f7f8f8', 
                border: '1px solid #dfe5eb',
                borderLeft: '0px',
                paddingTop: '10px'
            }}>
                {pageList}
                <Button 
                    size="small"
                    fullWidth
                    sx={{ mt: 1 }}
                    onClick={() => {
                        setName('')
                        setSelectedPage(null)
                }}>{intl.formatMessage({ id: 'page_manager.new_page' })}</Button>
            </Grid> */}


                <Section title="page_manager.path_input_label" description="page_manager.path_input_description">
                    {pathInput}
                    {saveButton}
                </Section>

                {/* <Section title="page_manager.purpose_label" description="page_manager.purpose_description">
                    <PageTypes  editor={editor} 
                                project={project} 
                                pages={pages} 
                                setSelectedPage={setSelectedPage}
                                selectedPage={selectedPage}
                    />
                </Section> */}

                <Section title="section.templates_tooltip_title" description="section.templates_tooltip_description">
                    {
                        selectedPage && (
                            <Button fullWidth onClick={() => {
                                // Prompt template pick full screen modal
                                dispatch({ type: UPDATE_APP, configuration: { new: true } })
                            }}>
                                {intl.formatMessage({ id: 'section.templates_tooltip_action' })}
                            </Button>
                        )
                    }
                </Section>

                <Section title="page_manager.smart_contract_label" description="page_manager.smart_contract_description">
                    <SmartContracts project={project} />
                </Section>

                {
                    selectedPage && (
                        <Button color="error" fullWidth onClick={handleDeletePage}>
                            {intl.formatMessage({ id: 'page_manager.delete' })}
                        </Button>
                    )
                }

        </Container>
    )
}

export default Pages
