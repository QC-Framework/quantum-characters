import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, List } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SpawnButton from '../../components/SpawnButton';
import { spawnToWorld, deselectCharacter } from '../../actions/characterActions';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: 450,
		height: 'fit-content',
		maxHeight: '80%',
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: '5%',
		margin: 'auto',
		padding: 20,
		background: theme.palette.secondary.dark,
		display: 'flex',
		flexDirection: 'column',
		overflow: 'hidden',
	},
	bodyWrapper: {
		textAlign: 'center',
		width: '100%',
		flexGrow: 1,
		overflow: 'hidden',
		display: 'flex',
		flexDirection: 'column',
	},
	spawnList: {
		padding: 0,
		overflowY: 'auto',
		overflowX: 'hidden',
		flexGrow: 1,
		'&::-webkit-scrollbar': {
			width: 6,
		},
		'&::-webkit-scrollbar-thumb': {
			background: '#131317',
		},
		'&::-webkit-scrollbar-thumb:hover': {
			background: theme.palette.primary.main,
		},
		'&::-webkit-scrollbar-track': {
			background: theme.palette.secondary.main,
		},
	},
	header: {
		borderLeft: `1px solid ${theme.palette.secondary.main}`,
		padding: 15,
		background: theme.palette.secondary.main,
		color: theme.palette.text.main,
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		fontFamily: "'Oswald', sans-serif !important",
		fontWeight: 'bold',
	},
	positive: {
		border: `2px solid ${theme.palette.success.dark}`,
		background: theme.palette.success.main,
		color: theme.palette.text.dark,
		fontSize: 20,
		padding: 10,
		width: 105,
		textAlign: 'center',
		transition: 'filter ease-in 0.15s',
		'&:hover': {
			borderColor: `${theme.palette.success.dark} !important`,
			boxShadow: 'none',
			background: theme.palette.success.main,
			filter: 'brightness(0.7)',
		},
	},
	negative: {
		border: `2px solid ${theme.palette.error.dark}`,
		background: theme.palette.error.main,
		color: theme.palette.text.main,
		fontSize: 20,
		padding: 10,
		width: 105,
		textAlign: 'center',
		transition: 'filter ease-in 0.15s',
		'&:hover': {
			background: theme.palette.error.main,
			filter: 'brightness(0.7)',
		},
	},
	actions: {
		position: 'absolute',
		width: 'fit-content',
		height: 'fit-content',
		bottom: '5%',
		left: 0,
		right: 0,
		margin: 'auto',
	},
}));


const Spawn = (props) => {
	const classes = useStyles();

	const onSpawn = () => {
		props.spawnToWorld(props.selected, props.selectedChar);
	};

	const goBack = () => {
		props.deselectCharacter();
	};

	return (
		<>
			<div className={classes.wrapper}>
				<div className={classes.bodyWrapper}>
					<div className={classes.header}>
						<span>Select Your Spawn</span>
					</div>
					<List className={classes.spawnList}>
						{props.spawns.map((spawn, i) => (
							<SpawnButton key={i} type="button" spawn={spawn} />
						))}
					</List>
				</div>
			</div>
			<div className={classes.actions}>
				<ButtonGroup>
					<Button onClick={goBack} className={classes.negative}>
						Cancel
					</Button>
					{Boolean(props.selected) && (
						<Button onClick={onSpawn} className={classes.positive}>
							Play
						</Button>
					)}
				</ButtonGroup>
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	spawns: state.spawn.spawns,
	selected: state.spawn.selected,
	selectedChar: state.characters.selected,
});

export default connect(mapStateToProps, {
	deselectCharacter,
	spawnToWorld,
})(Spawn);