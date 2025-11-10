const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-2xl font-bold tracking-tighter">TAR1K</div>
          
          <p className="text-muted-foreground text-sm">
            © 2025 TAR1K Musical. All rights reserved.
          </p>
          
              <div className="flex gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms</a>
                <a href="/press-kit" className="hover:text-primary transition-colors">Press Kit</a>
              </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
