import {styled, Tooltip, TooltipProps} from "@material-ui/core";

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .MuiTooltip-tooltip`]: {
        backgroundColor: theme.palette.common.white,
        width: '226px',
        height: '102px',
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: '0 0 10px rgba(0,0,0,0.5);',
        padding: '20px'
    },
}));