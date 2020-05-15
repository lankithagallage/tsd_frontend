import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  BDiv,
  BP,
} from "bootstrap-4-react";

const useStyles = makeStyles({});

const Chat = () => {
  const classes = useStyles();

  return (
    <div>
      <Row>
        <Col col="sm-12 md-4" style={{ borderRight: "1px solid #CCC" }}>
          <Form.Group>
            <Form.Input
              type="text"
              id="txtSearch"
              placeholder="Search in threads"
            />
            <Form.Text text="muted" xs={12} md={6}>
              Search Chats
            </Form.Text>
          </Form.Group>
          <List>
            <ListItem button key="School Update">
              <ListItemIcon>
                <Avatar>{"S"}</Avatar>
              </ListItemIcon>
              <ListItemText primary="#School Update"></ListItemText>
            </ListItem>
            <ListItem button key="Grade 10 A">
              <ListItemIcon>
                <Avatar>{"G"}</Avatar>
              </ListItemIcon>
              <ListItemText primary="#Grade 10 A"></ListItemText>
            </ListItem>
            <ListItem button key="Homework">
              <ListItemIcon>
                <Avatar>{"H"}</Avatar>
              </ListItemIcon>
              <ListItemText primary="#Homework"></ListItemText>
            </ListItem>
          </List>
        </Col>
        <Col col="sm-12 md-8">
          <Card>
            <Card.Body>
              <Typography component="h5" variant="h5" align="left">
                Grade 10 A
              </Typography>
              <List style={{ height: `calc(100vh - 260px)` }}>
                <ListItem key="1" xs={12} style={{ display: "inline-block" }}>
                  <BDiv bg="primary" float="right" p={2}>
                    <BP text="white" item display="print-block" mb="0">
                      Is the school closed today?
                    </BP>
                    <BP text="white-50" item display="print-block" mb="0">
                      admin 06:30 am
                    </BP>
                  </BDiv>
                </ListItem>

                <ListItem key="2" xs={12} style={{ display: "inline-block" }}>
                  <BDiv bg="secondary" float="left" p={2}>
                    <BP text="white" item display="print-block" mb="0">
                      Have to ask from the teacher?
                    </BP>
                    <BP text="white-50" item display="print-block" mb="0">
                      admin 06:35 am
                    </BP>
                  </BDiv>
                </ListItem>
                <ListItem key="3" xs={12} style={{ display: "inline-block" }}>
                  <BDiv bg="secondary" float="left" p={2}>
                    <BP text="white" item display="print-block" mb="0">
                      No, the school is not closed. Please bring the child on
                      time
                    </BP>
                    <BP text="white-50" item display="print-block" mb="0">
                      teacher 07:10 am
                    </BP>
                  </BDiv>
                </ListItem>
              </List>
              <Divider />
              <Row>
                <Col col="sm-12" p={3}>
                  <InputGroup mb="3">
                    <Form.Input
                      type="text"
                      id="txtSearch"
                      placeholder="Type the message"
                    />
                    <InputGroup.Append>
                      <Button primary>Send message</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Chat;
