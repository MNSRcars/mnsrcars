export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: unknown
          metadata: Json | null
          user_agent: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_documents: {
        Row: {
          created_at: string
          customer_id: string
          document_type: string
          expires_at: string | null
          id: string
          storage_path: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          document_type: string
          expires_at?: string | null
          id?: string
          storage_path: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          document_type?: string
          expires_at?: string | null
          id?: string
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_documents_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          city: string | null
          country: string
          created_at: string
          driver_license_country: string | null
          driver_license_expiry: string | null
          driver_license_number: string | null
          email: string | null
          first_name: string
          id: string
          last_name: string
          notes: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string
          created_at?: string
          driver_license_country?: string | null
          driver_license_expiry?: string | null
          driver_license_number?: string | null
          email?: string | null
          first_name: string
          id?: string
          last_name: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string
          created_at?: string
          driver_license_country?: string | null
          driver_license_expiry?: string | null
          driver_license_number?: string | null
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      extras: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          price: number
          pricing_type: Database["public"]["Enums"]["pricing_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          price?: number
          pricing_type?: Database["public"]["Enums"]["pricing_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          price?: number
          pricing_type?: Database["public"]["Enums"]["pricing_type"]
          updated_at?: string
        }
        Relationships: []
      }
      gps_devices: {
        Row: {
          created_at: string
          device_identifier: string
          id: string
          installed_at: string | null
          is_active: boolean
          label: string | null
          provider: string
          removed_at: string | null
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string
          device_identifier: string
          id?: string
          installed_at?: string | null
          is_active?: boolean
          label?: string | null
          provider: string
          removed_at?: string | null
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string
          device_identifier?: string
          id?: string
          installed_at?: string | null
          is_active?: boolean
          label?: string | null
          provider?: string
          removed_at?: string | null
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gps_devices_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      gps_positions: {
        Row: {
          battery_level: number | null
          created_at: string
          device_id: string
          fuel_level: number | null
          heading: number | null
          id: string
          ignition: boolean | null
          latitude: number
          longitude: number
          recorded_at: string
          speed: number | null
          vehicle_id: string | null
        }
        Insert: {
          battery_level?: number | null
          created_at?: string
          device_id: string
          fuel_level?: number | null
          heading?: number | null
          id?: string
          ignition?: boolean | null
          latitude: number
          longitude: number
          recorded_at?: string
          speed?: number | null
          vehicle_id?: string | null
        }
        Update: {
          battery_level?: number | null
          created_at?: string
          device_id?: string
          fuel_level?: number | null
          heading?: number | null
          id?: string
          ignition?: boolean | null
          latitude?: number
          longitude?: number
          recorded_at?: string
          speed?: number | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gps_positions_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "gps_devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gps_positions_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string | null
          city: string
          country: string
          created_at: string
          id: string
          is_active: boolean
          latitude: number | null
          longitude: number | null
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string
          country?: string
          created_at?: string
          id?: string
          is_active?: boolean
          latitude?: number | null
          longitude?: number | null
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string
          country?: string
          created_at?: string
          id?: string
          is_active?: boolean
          latitude?: number | null
          longitude?: number | null
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      maintenance_records: {
        Row: {
          completed_at: string | null
          cost_amount: number | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          maintenance_type: string | null
          mileage: number | null
          notes: string | null
          provider_name: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["maintenance_status"]
          title: string
          updated_at: string
          vehicle_id: string
        }
        Insert: {
          completed_at?: string | null
          cost_amount?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          maintenance_type?: string | null
          mileage?: number | null
          notes?: string | null
          provider_name?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["maintenance_status"]
          title: string
          updated_at?: string
          vehicle_id: string
        }
        Update: {
          completed_at?: string | null
          cost_amount?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          maintenance_type?: string | null
          mileage?: number | null
          notes?: string | null
          provider_name?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["maintenance_status"]
          title?: string
          updated_at?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_records_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          channel: Database["public"]["Enums"]["notification_channel"]
          created_at: string
          customer_id: string | null
          error_message: string | null
          id: string
          message: string
          provider: string | null
          provider_message_id: string | null
          reservation_id: string | null
          sent_at: string | null
          status: Database["public"]["Enums"]["notification_status"]
          subject: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          channel?: Database["public"]["Enums"]["notification_channel"]
          created_at?: string
          customer_id?: string | null
          error_message?: string | null
          id?: string
          message: string
          provider?: string | null
          provider_message_id?: string | null
          reservation_id?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["notification_status"]
          subject?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          channel?: Database["public"]["Enums"]["notification_channel"]
          created_at?: string
          customer_id?: string | null
          error_message?: string | null
          id?: string
          message?: string
          provider?: string | null
          provider_message_id?: string | null
          reservation_id?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["notification_status"]
          subject?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          customer_id: string
          id: string
          method: Database["public"]["Enums"]["payment_method"]
          notes: string | null
          paid_at: string | null
          provider: string | null
          provider_payment_id: string | null
          provider_reference: string | null
          refunded_at: string | null
          reservation_id: string
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string
        }
        Insert: {
          amount?: number
          created_at?: string
          currency?: string
          customer_id: string
          id?: string
          method?: Database["public"]["Enums"]["payment_method"]
          notes?: string | null
          paid_at?: string | null
          provider?: string | null
          provider_payment_id?: string | null
          provider_reference?: string | null
          refunded_at?: string | null
          reservation_id: string
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          customer_id?: string
          id?: string
          method?: Database["public"]["Enums"]["payment_method"]
          notes?: string | null
          paid_at?: string | null
          provider?: string | null
          provider_payment_id?: string | null
          provider_reference?: string | null
          refunded_at?: string | null
          reservation_id?: string
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_rules: {
        Row: {
          category: Database["public"]["Enums"]["vehicle_category"] | null
          created_at: string
          discount_percent: number | null
          end_date: string
          id: string
          is_active: boolean
          minimum_days: number | null
          name: string
          price_per_day: number | null
          price_per_month: number | null
          price_per_week: number | null
          priority: number
          start_date: string
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["vehicle_category"] | null
          created_at?: string
          discount_percent?: number | null
          end_date: string
          id?: string
          is_active?: boolean
          minimum_days?: number | null
          name: string
          price_per_day?: number | null
          price_per_month?: number | null
          price_per_week?: number | null
          priority?: number
          start_date: string
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["vehicle_category"] | null
          created_at?: string
          discount_percent?: number | null
          end_date?: string
          id?: string
          is_active?: boolean
          minimum_days?: number | null
          name?: string
          price_per_day?: number | null
          price_per_month?: number | null
          price_per_week?: number | null
          priority?: number
          start_date?: string
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pricing_rules_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          is_active: boolean
          last_login_at: string | null
          last_name: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string
          id: string
          is_active?: boolean
          last_login_at?: string | null
          last_name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          is_active?: boolean
          last_login_at?: string | null
          last_name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      rental_contracts: {
        Row: {
          company_signature: string | null
          contract_number: string | null
          created_at: string
          customer_id: string
          customer_signature: string | null
          end_at: string
          id: string
          pickup_condition: string | null
          pickup_fuel_level: string | null
          pickup_mileage: number | null
          pickup_notes: string | null
          reservation_id: string
          return_condition: string | null
          return_fuel_level: string | null
          return_mileage: number | null
          return_notes: string | null
          signed_at: string | null
          start_at: string
          status: Database["public"]["Enums"]["rental_contract_status"]
          updated_at: string
          vehicle_id: string
        }
        Insert: {
          company_signature?: string | null
          contract_number?: string | null
          created_at?: string
          customer_id: string
          customer_signature?: string | null
          end_at: string
          id?: string
          pickup_condition?: string | null
          pickup_fuel_level?: string | null
          pickup_mileage?: number | null
          pickup_notes?: string | null
          reservation_id: string
          return_condition?: string | null
          return_fuel_level?: string | null
          return_mileage?: number | null
          return_notes?: string | null
          signed_at?: string | null
          start_at: string
          status?: Database["public"]["Enums"]["rental_contract_status"]
          updated_at?: string
          vehicle_id: string
        }
        Update: {
          company_signature?: string | null
          contract_number?: string | null
          created_at?: string
          customer_id?: string
          customer_signature?: string | null
          end_at?: string
          id?: string
          pickup_condition?: string | null
          pickup_fuel_level?: string | null
          pickup_mileage?: number | null
          pickup_notes?: string | null
          reservation_id?: string
          return_condition?: string | null
          return_fuel_level?: string | null
          return_mileage?: number | null
          return_notes?: string | null
          signed_at?: string | null
          start_at?: string
          status?: Database["public"]["Enums"]["rental_contract_status"]
          updated_at?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rental_contracts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_contracts_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_contracts_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      reservation_extras: {
        Row: {
          created_at: string
          extra_id: string
          quantity: number
          reservation_id: string
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          extra_id: string
          quantity?: number
          reservation_id: string
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string
          extra_id?: string
          quantity?: number
          reservation_id?: string
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "reservation_extras_extra_id_fkey"
            columns: ["extra_id"]
            isOneToOne: false
            referencedRelation: "extras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservation_extras_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      reservation_status_history: {
        Row: {
          changed_by: string | null
          created_at: string
          id: string
          new_status: Database["public"]["Enums"]["reservation_status"]
          old_status: Database["public"]["Enums"]["reservation_status"] | null
          reason: string | null
          reservation_id: string
        }
        Insert: {
          changed_by?: string | null
          created_at?: string
          id?: string
          new_status: Database["public"]["Enums"]["reservation_status"]
          old_status?: Database["public"]["Enums"]["reservation_status"] | null
          reason?: string | null
          reservation_id: string
        }
        Update: {
          changed_by?: string | null
          created_at?: string
          id?: string
          new_status?: Database["public"]["Enums"]["reservation_status"]
          old_status?: Database["public"]["Enums"]["reservation_status"] | null
          reason?: string | null
          reservation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservation_status_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservation_status_history_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations: {
        Row: {
          cancelled_at: string | null
          created_at: string
          created_by: string | null
          currency: string
          customer_id: string
          customer_notes: string | null
          deposit_amount: number
          discount_amount: number
          id: string
          internal_notes: string | null
          options_amount: number
          pickup_at: string
          pickup_location_id: string | null
          price_per_day: number
          reservation_number: string | null
          return_at: string
          return_location_id: string | null
          source: string
          status: Database["public"]["Enums"]["reservation_status"]
          subtotal_amount: number
          tax_amount: number
          total_amount: number
          updated_at: string
          vehicle_id: string
        }
        Insert: {
          cancelled_at?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          customer_id: string
          customer_notes?: string | null
          deposit_amount?: number
          discount_amount?: number
          id?: string
          internal_notes?: string | null
          options_amount?: number
          pickup_at: string
          pickup_location_id?: string | null
          price_per_day?: number
          reservation_number?: string | null
          return_at: string
          return_location_id?: string | null
          source?: string
          status?: Database["public"]["Enums"]["reservation_status"]
          subtotal_amount?: number
          tax_amount?: number
          total_amount?: number
          updated_at?: string
          vehicle_id: string
        }
        Update: {
          cancelled_at?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          customer_id?: string
          customer_notes?: string | null
          deposit_amount?: number
          discount_amount?: number
          id?: string
          internal_notes?: string | null
          options_amount?: number
          pickup_at?: string
          pickup_location_id?: string | null
          price_per_day?: number
          reservation_number?: string | null
          return_at?: string
          return_location_id?: string | null
          source?: string
          status?: Database["public"]["Enums"]["reservation_status"]
          subtotal_amount?: number
          tax_amount?: number
          total_amount?: number
          updated_at?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_pickup_location_id_fkey"
            columns: ["pickup_location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_return_location_id_fkey"
            columns: ["return_location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      vehicle_damage_reports: {
        Row: {
          created_at: string
          created_by: string | null
          description: string
          estimated_cost: number
          id: string
          inspection_id: string | null
          photos: string[]
          reservation_id: string | null
          severity: Database["public"]["Enums"]["damage_severity"]
          status: Database["public"]["Enums"]["damage_status"]
          updated_at: string
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description: string
          estimated_cost?: number
          id?: string
          inspection_id?: string | null
          photos?: string[]
          reservation_id?: string | null
          severity?: Database["public"]["Enums"]["damage_severity"]
          status?: Database["public"]["Enums"]["damage_status"]
          updated_at?: string
          vehicle_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string
          estimated_cost?: number
          id?: string
          inspection_id?: string | null
          photos?: string[]
          reservation_id?: string | null
          severity?: Database["public"]["Enums"]["damage_severity"]
          status?: Database["public"]["Enums"]["damage_status"]
          updated_at?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_damage_reports_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_damage_reports_inspection_id_fkey"
            columns: ["inspection_id"]
            isOneToOne: false
            referencedRelation: "vehicle_inspections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_damage_reports_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_damage_reports_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_documents: {
        Row: {
          created_at: string
          document_type: string
          expires_at: string | null
          id: string
          notes: string | null
          storage_path: string
          updated_at: string
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          document_type: string
          expires_at?: string | null
          id?: string
          notes?: string | null
          storage_path: string
          updated_at?: string
          vehicle_id: string
        }
        Update: {
          created_at?: string
          document_type?: string
          expires_at?: string | null
          id?: string
          notes?: string | null
          storage_path?: string
          updated_at?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_documents_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_images: {
        Row: {
          alt_text: string | null
          created_at: string
          id: string
          is_primary: boolean
          sort_order: number
          storage_path: string
          vehicle_id: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: string
          is_primary?: boolean
          sort_order?: number
          storage_path: string
          vehicle_id: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: string
          is_primary?: boolean
          sort_order?: number
          storage_path?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_images_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_inspections: {
        Row: {
          created_at: string
          created_by: string | null
          damage_notes: string | null
          fuel_level: string | null
          id: string
          mileage: number | null
          notes: string | null
          photos: string[]
          reservation_id: string | null
          type: Database["public"]["Enums"]["inspection_type"]
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          damage_notes?: string | null
          fuel_level?: string | null
          id?: string
          mileage?: number | null
          notes?: string | null
          photos?: string[]
          reservation_id?: string | null
          type: Database["public"]["Enums"]["inspection_type"]
          vehicle_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          damage_notes?: string | null
          fuel_level?: string | null
          id?: string
          mileage?: number | null
          notes?: string | null
          photos?: string[]
          reservation_id?: string | null
          type?: Database["public"]["Enums"]["inspection_type"]
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_inspections_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_inspections_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_inspections_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          brand: string
          category: Database["public"]["Enums"]["vehicle_category"]
          color: string | null
          created_at: string
          deposit_amount: number
          description: string | null
          doors: number
          features: string[]
          fuel_type: Database["public"]["Enums"]["fuel_type"]
          id: string
          is_featured: boolean
          is_public: boolean
          license_plate: string
          mileage: number
          model: string
          price_per_day: number
          price_per_month: number
          price_per_week: number
          seats: number
          slug: string
          status: Database["public"]["Enums"]["vehicle_status"]
          transmission: Database["public"]["Enums"]["transmission_type"]
          updated_at: string
          vin: string | null
          year: number
        }
        Insert: {
          brand: string
          category: Database["public"]["Enums"]["vehicle_category"]
          color?: string | null
          created_at?: string
          deposit_amount?: number
          description?: string | null
          doors: number
          features?: string[]
          fuel_type: Database["public"]["Enums"]["fuel_type"]
          id?: string
          is_featured?: boolean
          is_public?: boolean
          license_plate: string
          mileage?: number
          model: string
          price_per_day?: number
          price_per_month?: number
          price_per_week?: number
          seats: number
          slug: string
          status?: Database["public"]["Enums"]["vehicle_status"]
          transmission: Database["public"]["Enums"]["transmission_type"]
          updated_at?: string
          vin?: string | null
          year: number
        }
        Update: {
          brand?: string
          category?: Database["public"]["Enums"]["vehicle_category"]
          color?: string | null
          created_at?: string
          deposit_amount?: number
          description?: string | null
          doors?: number
          features?: string[]
          fuel_type?: Database["public"]["Enums"]["fuel_type"]
          id?: string
          is_featured?: boolean
          is_public?: boolean
          license_plate?: string
          mileage?: number
          model?: string
          price_per_day?: number
          price_per_month?: number
          price_per_week?: number
          seats?: number
          slug?: string
          status?: Database["public"]["Enums"]["vehicle_status"]
          transmission?: Database["public"]["Enums"]["transmission_type"]
          updated_at?: string
          vin?: string | null
          year?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_any_role: { Args: { required: string[] }; Returns: boolean }
      reservation_is_blocking: {
        Args: { p_status: Database["public"]["Enums"]["reservation_status"] }
        Returns: boolean
      }
    }
    Enums: {
      damage_severity: "minor" | "moderate" | "severe"
      damage_status: "reported" | "repaired" | "invoiced" | "closed"
      fuel_type: "petrol" | "diesel" | "hybrid" | "electric"
      inspection_type: "pickup" | "return"
      maintenance_status: "planned" | "in_progress" | "completed" | "cancelled"
      notification_channel: "email" | "sms" | "whatsapp" | "system"
      notification_status: "pending" | "sent" | "failed" | "cancelled"
      payment_method: "cash" | "bank_transfer" | "card" | "online" | "other"
      payment_status:
        | "pending"
        | "authorized"
        | "paid"
        | "failed"
        | "refunded"
        | "cancelled"
      pricing_type: "per_day" | "per_rental" | "fixed"
      rental_contract_status:
        | "draft"
        | "pending_signature"
        | "signed"
        | "active"
        | "completed"
        | "cancelled"
      reservation_status:
        | "pending"
        | "confirmed"
        | "cancelled"
        | "rejected"
        | "rented"
        | "completed"
        | "no_show"
      transmission_type: "manual" | "automatic"
      user_role: "super_admin" | "admin" | "manager" | "agent" | "accountant"
      vehicle_category:
        | "economy"
        | "compact"
        | "sedan"
        | "suv"
        | "luxury"
        | "van"
      vehicle_status:
        | "available"
        | "reserved"
        | "rented"
        | "maintenance"
        | "inactive"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      damage_severity: ["minor", "moderate", "severe"],
      damage_status: ["reported", "repaired", "invoiced", "closed"],
      fuel_type: ["petrol", "diesel", "hybrid", "electric"],
      inspection_type: ["pickup", "return"],
      maintenance_status: ["planned", "in_progress", "completed", "cancelled"],
      notification_channel: ["email", "sms", "whatsapp", "system"],
      notification_status: ["pending", "sent", "failed", "cancelled"],
      payment_method: ["cash", "bank_transfer", "card", "online", "other"],
      payment_status: [
        "pending",
        "authorized",
        "paid",
        "failed",
        "refunded",
        "cancelled",
      ],
      pricing_type: ["per_day", "per_rental", "fixed"],
      rental_contract_status: [
        "draft",
        "pending_signature",
        "signed",
        "active",
        "completed",
        "cancelled",
      ],
      reservation_status: [
        "pending",
        "confirmed",
        "cancelled",
        "rejected",
        "rented",
        "completed",
        "no_show",
      ],
      transmission_type: ["manual", "automatic"],
      user_role: ["super_admin", "admin", "manager", "agent", "accountant"],
      vehicle_category: ["economy", "compact", "sedan", "suv", "luxury", "van"],
      vehicle_status: [
        "available",
        "reserved",
        "rented",
        "maintenance",
        "inactive",
      ],
    },
  },
} as const
