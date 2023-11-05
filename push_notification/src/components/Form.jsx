
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
`

const FormContainer = styled.div`
  max-width: 450px;

  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 18px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 90%;
  height: 100px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function Form() {
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [registrationToken, setRegistrationToken] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Request permission for push notifications
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        // Get the registration token
        navigator.serviceWorker.getRegistration().then((registration) => {
          registration.pushManager.getSubscription().then((subscription) => {
            if (subscription) {
              setRegistrationToken(subscription.endpoint);
            }
          });
        });
      }
    });

    // Listen for incoming push notifications
    navigator.serviceWorker.addEventListener('message', (event) => {
      setNotification(event.data);
    });
  }, []);

  const sendPushNotification = async () => {
    // Send the registration token to your server
    await fetch('/send-push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registrationTokens: [registrationToken],
        title: 'Hello from React!',
        body: 'This is a push notification from your React app.',
      }),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <Container>
        <FormContainer>
      <FormTitle>register device token</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="body">Body</Label>
          <TextArea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            required
          />
        </FormField>
        <Button type="submit">Submit</Button>
      </form>
    </FormContainer>
    <FormContainer>
      <FormTitle>Push Notification Test</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="body">Body</Label>
          <TextArea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            required
          />
        </FormField>
        <Button type="submit">Submit</Button>
      </form>
    </FormContainer>
    </Container>
  );
}

export default Form;