# Compatibility shim for old Liquid/Jekyll stacks on Ruby 3.2+.
# Ruby 3.2 removed taint APIs, but Liquid 4.0.3 still calls them.
class Object
  unless method_defined?(:tainted?)
    def tainted?
      false
    end
  end

  unless method_defined?(:taint)
    def taint
      self
    end
  end

  unless method_defined?(:untaint)
    def untaint
      self
    end
  end

  unless method_defined?(:trust)
    def trust
      self
    end
  end

  unless method_defined?(:untrust)
    def untrust
      self
    end
  end
end
