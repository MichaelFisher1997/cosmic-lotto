import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box p={4}>
          <Heading as="h2" size="lg" mb={4}>
            Something went wrong
          </Heading>
          <Text mb={4}>
            {this.state.error?.message}
          </Text>
          <Button 
            onClick={() => this.setState({ hasError: false, error: null })}
            colorScheme="blue"
          >
            Try again
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
