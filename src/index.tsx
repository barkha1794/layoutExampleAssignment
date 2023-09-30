import React from 'react'
import { createRoot } from 'react-dom/client'
import {
    CssBaseline,
    Experimental_CssVarsProvider as CssVarsProvider,
    FormControlLabel,
    Switch,
    Box,
    Divider,
    Paper,
    Stack,
    styled,
    Typography,
    IconButton,
    useColorScheme,
    RadioGroup,
    Radio,
} from '@mui/material'
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { OldLayout, NewLayoutFieldsPair, NewLayout } from './types'
import { exampleOne, exampleThree, exampleTwo, simpleExample } from './examples'
import { calcLCM } from './utils'

const container = document.getElementById('root')!
const root = createRoot(container)

function convertOldToNewLayout(oldLayout: OldLayout): NewLayoutFieldsPair {
    function combineArrInXAxis(arr: Array<string[]>) {
        const lcm = calcLCM(arr.map((ch) => ch.length))

        return Array.from({ length: lcm }, (_, idx) => {
            const content = Array.from({ length: arr.length }, (_, arrIdx) => {
                const spanY = lcm / arr[arrIdx].length
                return arr[arrIdx][Math.floor(idx / spanY)]
            }).join(' ')

            return `'${content}'`
        })
    }

    function readArr(val: OldLayout, isRow = 0): { value: number; state: OldLayout; isLeaf?: boolean } {
        if (!Array.isArray(val)) {
            return { value: 1, state: val, isLeaf: true }
        }

        const afterRecursive = val.map((item) => readArr(item, isRow + 1))

        if (afterRecursive.every((item) => Boolean(item.isLeaf))) {
            return {
                value: isRow % 2 === 0 ? afterRecursive.length : 1,
                state: afterRecursive.map(({ state }) => state),
            }
        }

        if (isRow % 2 === 1) {
            // combining n rows
            const lcm = calcLCM(afterRecursive.map(({ value }) => value))

            const newState = afterRecursive.map(({ state, value }) => {
                const item = Array.isArray(state) ? state : [state]
                const spanX = lcm / value

                const contentArr = spanX === 1 ? item : item.map((ch) => new Array(spanX).fill(ch).join(' '))
                return `'${contentArr.join(' ')}'`
            })

            return { value: lcm, state: newState }
        } else {
            // combining n columns
            const lcmX = calcLCM(afterRecursive.map(({ value }) => value))

            const newStateArr = afterRecursive.map(({ state, value }) => {
                const items = (Array.isArray(state) ? state : [state]) as string[]
                const spanX = lcmX / value
                return items.map((str) =>
                    str
                        .replace(/' '/g, '@@@')
                        .replace(/'/g, '')
                        .replace(/@@@/g, "' '")
                        .split(' ')
                        .map((ch) => new Array(spanX).fill(ch).join(' '))
                        .join(' ')
                )
            })

            return {
                value: lcmX * val.length,
                state: combineArrInXAxis(newStateArr),
            }
        }
    }

    const str = readArr(oldLayout).state as string[]

    return [str.join(' '), oldLayout.toString().split(',')]
}

export const LayoutExercise: React.FunctionComponent = (props) => {
    const [chosenExample, setChosenExample] = React.useState(simpleExample)
    const chooseExample = React.useCallback((exampleIndex: number) => {
        switch (exampleIndex) {
            case 0:
                setChosenExample(simpleExample)
                break
            case 1:
                setChosenExample(exampleOne)
                break
            case 2:
                setChosenExample(exampleTwo)
                break
            case 3:
                setChosenExample(exampleThree)
                break
            default:
                setChosenExample(exampleOne)
                break
        }
    }, [])
    const [newLayout, fields] = React.useMemo(() => convertOldToNewLayout(chosenExample.input), [chosenExample])
    const [outlineFieldsets, setOutlineFieldsets] = React.useState(false)
    return (
        <Box>
            <Paper elevation={4} sx={{ padding: 3 }}>
                <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                    defaultValue={0}
                    onChange={(e, value) => chooseExample(parseInt(value))}
                >
                    <FormControlLabel value={0} control={<Radio />} label='Simple Example' />
                    <FormControlLabel value={1} control={<Radio />} label='Example One' />
                    <FormControlLabel value={2} control={<Radio />} label='Example Two' />
                    <FormControlLabel value={3} control={<Radio />} label='Example Three' />
                </RadioGroup>
            </Paper>
            <Paper elevation={4} sx={{ padding: 3, mt: 3 }}>
                <Typography variant='h5' sx={{ mb: 2 }}>
                    Old Layout:
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={outlineFieldsets}
                            onChange={() => setOutlineFieldsets((prev) => !prev)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    }
                    label='Outline Fieldsets'
                />
                <OldLayoutRenderer layout={chosenExample.input} outlineFieldsets={outlineFieldsets} />
            </Paper>
            <Paper elevation={4} sx={{ padding: 3, mt: 3 }}>
                <Typography variant='h5' sx={{ mb: 2 }}>
                    New Layout:
                </Typography>
                <NewLayoutRenderer layout={newLayout} fields={fields} />
            </Paper>
            <Paper elevation={4} sx={{ padding: 3, mt: 3 }}>
                <Typography variant='h5' sx={{ mb: 2 }}>
                    Expected Result:
                </Typography>
                <NewLayoutRenderer layout={chosenExample.output[0]} fields={chosenExample.output[1]} />
            </Paper>
        </Box>
    )
}

interface OldLayoutRendererProps {
    layout: OldLayout
    outlineFieldsets?: boolean
}

const OldLayoutRenderer: React.FunctionComponent<OldLayoutRendererProps> = (props) => {
    const { layout, outlineFieldsets } = props
    return <Fieldset layout={layout} outlineFieldsets={outlineFieldsets} />
}

interface FieldsetProps {
    layout: OldLayout
    orientation?: 'horizontal' | 'vertical'
    level?: number
    outlineFieldsets?: boolean
}

const Fieldset: React.FunctionComponent<FieldsetProps> = (props) => {
    const { layout, orientation = 'horizontal', level = 0, outlineFieldsets = false } = props
    if (typeof layout === 'string') {
        return (
            <Box
                key={layout}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '25px',
                    p: 2,
                    backgroundColor: 'gray',
                    boxSizing: 'border-box',
                    width: '100%',
                    height: '100%',
                }}
            >
                {layout}
            </Box>
        )
    }
    return (
        <StyledFieldset orientation={orientation} outlineFieldsets={outlineFieldsets}>
            {layout.map((l, idx) => (
                <Fieldset
                    key={`level-${level}-${idx}`}
                    layout={l}
                    orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'}
                    outlineFieldsets={outlineFieldsets}
                />
            ))}
        </StyledFieldset>
    )
}

const StyledFieldset = styled('div')<{ orientation: 'horizontal' | 'vertical'; outlineFieldsets?: boolean }>(
    ({ orientation, outlineFieldsets, theme }) => {
        if (outlineFieldsets) {
            return {
                display: 'flex',
                flexGrow: 1,
                alignItems: 'stretch',
                flexDirection: orientation === 'horizontal' ? 'row' : 'column',
                width: '100%',
                gap: '8px',
                border: `1px solid ${orientation === 'horizontal' ? 'blue' : 'red'}`,
                padding: '5px',
            }
        }
        return {
            display: 'flex',
            flexGrow: 1,
            flexDirection: orientation === 'horizontal' ? 'row' : 'column',
            width: '100%',
            gap: '8px',
        }
    }
)

interface NewLayoutRendererProps {
    layout: NewLayout
    fields: string[]
}

const NewLayoutRenderer: React.FunctionComponent<NewLayoutRendererProps> = (props) => {
    const { layout, fields } = props
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateAreas: layout,
                gap: 1,
                alignItems: 'stretch',
                justifyItems: 'stretch',
                gridAutoColumns: '1fr',
                gridAutoRows: '1fr',
            }}
        >
            {fields.map((f) => (
                <Box
                    key={f}
                    sx={{
                        textAlign: 'center',
                        p: 2,
                        backgroundColor: 'gray',
                        boxSizing: 'border-box',
                        gridArea: f,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {f}
                </Box>
            ))}
        </Box>
    )
}

/**
 * Renders a button that toggles Material UI's pallette mode between 'light'
 * and 'dark' when clicked.
 */
export const ThemeModeSwitch: React.FunctionComponent = (props) => {
    const { mode, setMode } = useColorScheme()

    return (
        <IconButton
            onClick={() => {
                setMode(mode === 'light' ? 'dark' : 'light')
            }}
        >
            {mode === 'light' ? <DarkModeOutlined /> : <LightModeOutlined />}
        </IconButton>
    )
}

const StyledStack = styled(Stack)(({ theme }) => ({
    minWidth: '600px',
    maxWidth: '1200px',
    width: `calc(100% - ${theme.spacing(6)})`,
    margin: 'auto',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
}))

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
}))

root.render(
    <React.StrictMode>
        <CssVarsProvider>
            <CssBaseline />
            <Box sx={{ position: 'fixed', right: '0.5rem', top: '0.5rem' }}>
                <ThemeModeSwitch />
            </Box>
            <StyledStack spacing={2} divider={<Divider orientation='horizontal' flexItem />}>
                <Item elevation={1}>
                    <Typography variant='h1' sx={{ fontSize: '2.0rem', mb: 2 }}>
                        Layout Exercise
                    </Typography>
                    <LayoutExercise />
                </Item>
            </StyledStack>
        </CssVarsProvider>
    </React.StrictMode>
)
