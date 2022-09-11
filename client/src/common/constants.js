export const PLAYLIST_CONTENT_TYPE = [
  {
    key: "IMG",
    value: "IMG",
  },
  {
    key: "VIDEO",
    value: "VIDEO",
  },
];

export const boxStyle = {
  position: "absolute",
  display: 'flex',
  flexDirection: 'row',
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  '& > :not(style)': { m: 1, width: '25ch' }
};

export const cardStyle = {
  width: 300,
  height: 300,
  backgroundColor: '#AC7D0C'
}

export const OPERATIONS = {
    CREATE: 'create',
    EDIT: 'edit'
}