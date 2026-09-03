import { Heart, Instagram, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-[#7c3d52] text-white pt-20 pb-10 px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
          
          <div className="md:col-span-2 space-y-6">
            <h3 className="font-serif text-3xl italic tracking-wide">Magical Wreaths</h3>
            <p className="text-white/70 max-w-sm leading-relaxed">
              Handcrafted with love by Debbie Gentry. Bringing Southern charm, joy, and warmth to your front door, one beautiful wreath at a time.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="https://www.instagram.com/magicalwreaths.ilm/" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="ghost" className="rounded-full bg-white/5 hover:bg-primary hover:text-white border border-white/10">
                  <Instagram size={20} />
                </Button>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61561614237590" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="ghost" className="rounded-full bg-white/5 hover:bg-primary hover:text-white border border-white/10">
                  <Facebook size={20} />
                </Button>
              </a>
              <a href="mailto:gentrydebbie13@gmail.com">
                <Button size="icon" variant="ghost" className="rounded-full bg-white/5 hover:bg-primary hover:text-white border border-white/10">
                  <Mail size={20} />
                </Button>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6 text-primary">Explore</h4>
            <ul className="space-y-4 text-white/70">
              <li><a href="#about" className="hover:text-white transition-colors">Meet Debbie</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">The Collections</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6 text-primary">Get in Touch</h4>
            <ul className="space-y-4 text-white/70">
              <li className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-white/50 mb-1">Email</span>
                <a href="mailto:gentrydebbie13@gmail.com" className="hover:text-white transition-colors">gentrydebbie13@gmail.com</a>
              </li>
              <li className="flex flex-col mt-4">
                <span className="text-xs uppercase tracking-wider text-white/50 mb-1">Location</span>
                <span>Eastern North Carolina</span>
              </li>
              <li className="flex flex-col mt-4">
                <span className="text-xs uppercase tracking-wider text-white/50 mb-2">Payment Accepted</span>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://venmo.com/code?user_id=4171770093373114764&created=1780754179"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#3D95CE] hover:text-[#5fb0e0] transition-colors text-sm font-medium"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#3D95CE] inline-block"></span>
                    Venmo
                  </a>
                  <a
                    href="https://cash.app/$Didiswreaths1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#00D632] hover:text-[#33dd5a] transition-colors text-sm font-medium"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#00D632] inline-block"></span>
                    CashApp · $Didiswreaths1
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Debbie's Magical Wreaths. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Made with <Heart size={14} className="text-primary" /> in the South
          </p>
        </div>
      </div>
    </footer>
  );
}
