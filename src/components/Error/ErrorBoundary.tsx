import { Component, ErrorInfo } from "react";

type Props = {
  fallback: React.ReactNode;
  children?: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    if (typeof error !== "undefined") return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
